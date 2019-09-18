import { aiWithAsyncInit, aiMethod, aiInit } from 'asynchronous-tools';

import Storage from '../storage';
import * as Types from '../types';

interface Constructor {
    request: Types.HttpRequest,
    storage: Storage,
    getCacheKey: Types.GetCacheKey,
    serializer: Types.Serializer
}

@aiWithAsyncInit
export default class OfflineService {
    private request: Types.HttpRequest;
    private storage!: Storage;
    private getCacheKey: Types.GetCacheKey;
    private serializer: Types.Serializer;

    constructor({ request, storage, getCacheKey, serializer }: Constructor) {
      this.request = request;
      //TODO: implement key extractor
      this.getCacheKey = getCacheKey
      this.serializer = serializer
      this.storage = storage
    }

    @aiInit
    public async init() {
        // console.log('Receiver init')
    }

    // ==================== Request functions ====================

    private networkOnlyRequest: Types.RequestFunction = async (...args) => {
        const response = await this.request(...args);
        return ({ response: { ...response, serialized: await this.serializer(response) } }) as Types.RequestResult;
    }
    
    private cacheOnlyRequest: Types.RequestFunction = async (url, params) => {
        const cacheKey = this.getCacheKey(url, params);
        const { exist, expired, data } = await this.storage.getCacheItem(cacheKey);
        if (exist) {
            return { response: data, cacheStatus: expired ? Types.CacheStatus.Expired : Types.CacheStatus.Unexpired }
        } else {
            //TODO: think about format of this error
            throw "The requested data doesn't exist in the cache"
        }
    };
    
    private networkFallingBackToCacheRequest: Types.RequestFunction = async (url, params) => {
        try {
            const { response } = await this.networkOnlyRequest(url, params);
            if (response.ok) {
                return { response }
            } else {
                throw response
            }
        } catch (networkError) {
            try {
                // without "await" catch block will not handle exception!
                return await this.cacheOnlyRequest(url, params);
            } catch (cacheError) {
                //TODO: think about format of this error, maybe provide networkError somehow...
                throw "The network request has been failed but cached data doesn't exist"
            }
        }
    };
    
    private cacheFallingBackToNetworkRequest: Types.RequestFunction = async (url, params) => {
        try {
            const { response, cacheStatus } = await this.cacheOnlyRequest(url, params);
            if (cacheStatus === Types.CacheStatus.Unexpired) {
                return { response, cacheStatus }
            } else {
                throw "The cache data is expired"
            }
        } catch (cacheError) {
            try {
                return await this.networkOnlyRequest(url, params);
            } catch (networkError) {
                //TODO: think about format of this error, maybe provide networkError somehow...
                throw "The cache doesn't exist or expired but network request has been faild"
            }
        }
    }
    
    // It's just a first part of algorythm, in the "request" method a second part will be invoked 
    //   by recursive call of "request" with NetworkOnly strategy
    private cacheThenNetworkRequest: Types.CacheThenNetworkRequestFunction = async (url, params) => {
        try {
            return await this.cacheOnlyRequest(url, params)
        } catch (error) {
            return { cacheStatus: Types.CacheStatus.DoesNotExist }
        }
    }

    // ==================== Caching functions ====================

    private refreshAlwaysCaching: Types.CachingFunction = async (url, params, data, cacheStatus) => {
        if (cacheStatus !== undefined) {
            // the data has been received from cache, we sholudn't update cache data
            return Types.CachingResult.NotUpdated
        }
        const cacheKey = this.getCacheKey(url, params);
        try {
            await this.storage.addCacheItem(cacheKey, data);
            return Types.CachingResult.HasBeenUpdated
        } catch (error) {
            //TODO: think
            throw error
        }
    };
    
    private refreshWhenExpiredCaching: Types.CachingFunction = async (url, params, data, cacheStatus) => {
        if (cacheStatus !== undefined) {
            // the data has been received from cache, we sholudn't update cache data
            return Types.CachingResult.NotUpdated
        }
    
        const cacheKey = this.getCacheKey(url, params);
        const { exist, expired, ...rest } = await this.storage.getCacheItem(cacheKey);
        if (exist && !expired) {
            return Types.CachingResult.NotUpdated
        } else {
            await this.storage.addCacheItem(cacheKey, data);
            return Types.CachingResult.HasBeenUpdated
        }
    
    };

    private mergeResponseWithCachedInfo: Types.MergeResponseWithCacheInfo = (response: Response, cacheStatus: Types.CacheStatus | undefined) => {
        return cacheStatus === undefined
            ? response 
            : { ...response, cached: true, expired: cacheStatus === Types.CacheStatus.Expired }
    }

    @aiMethod
    public async receive(url: RequestInfo, params: Types.RequestInitWithCacheParameters): Promise<Types.ResponseWithCacheInfo | Types.CacheThenNetworkRequestStrategyResult> {
        const { 
            refreshCacheStrategy = Types.RefreshCacheStrategy.RefreshAlways,
            requestCacheStrategy = Types.RequestCacheStrategy.CacheFallingBackToNetwork, 
            // requestType = RequestTypes.DataReceiveRequest, 
            ...restParams 
        } = params;
        try {
            const { response, cacheStatus } = await ({
                [Types.RequestCacheStrategy.NetworkOnly]: this.networkOnlyRequest,
                [Types.RequestCacheStrategy.CacheOnly]: this.cacheOnlyRequest,
                [Types.RequestCacheStrategy.NetworkFallingBackToCache]: this.networkFallingBackToCacheRequest,
                [Types.RequestCacheStrategy.CacheFallingBackToNetwork]: this.cacheFallingBackToNetworkRequest,
                [Types.RequestCacheStrategy.CacheThenNetwork]: this.cacheThenNetworkRequest,
            }[requestCacheStrategy] || (() => { throw 'Unknown request cache strategy' }))(url, restParams);

            if (requestCacheStrategy === Types.RequestCacheStrategy.CacheThenNetwork) {
                return {
                    ...response ? { cached: this.mergeResponseWithCachedInfo(response, cacheStatus) } : {},
                    network: this.receive(url, { ...params, requestCacheStrategy: Types.RequestCacheStrategy.NetworkOnly }) as Promise<Types.ResponseWithCacheInfo>
                }
            }

            if (response!.ok) {
                try {
                    // We have not to wait cache update and we don't need the result of caching
                    // const cacheResult = await ({
                    ({
                        [Types.RefreshCacheStrategy.NoStore]: () => {},
                        [Types.RefreshCacheStrategy.RefreshAlways]: this.refreshAlwaysCaching,
                        [Types.RefreshCacheStrategy.RefreshWhenExpired]: this.refreshWhenExpiredCaching,
                    }[refreshCacheStrategy] || (() => { throw 'Unknown refresh cache strategy' }))(url, restParams, response, cacheStatus);
                    
                    return this.mergeResponseWithCachedInfo(response!, cacheStatus);

                } catch (error) {
                    //TODO: provide error object
                    throw 'Caching has been failed'
                }
            } else {
                //TODO: to think about this case
                throw response
            }
        } catch (error) {
            throw error;
        }
    }
}