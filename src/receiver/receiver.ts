import { aiWithAsyncInit, aiMethod, aiInit } from 'asynchronous-tools';

import Storage from '../storage';
import { HttpRequest, GetCacheKey, Serializer, RequestFunction, RequestResult, CacheStatus, CacheThenNetworkRequestFunction, CachingFunction, CachingResult, MergeResponseWithCacheInfo, RequestInitWithCacheParameters, CustomRequest, RefreshCacheStrategy, RequestCacheStrategy, ResponseWithCacheInfo } from '../types';

interface Constructor {
    request: HttpRequest,
    storage: Storage,
    getCacheKey: GetCacheKey,
    serializer: Serializer
}

@aiWithAsyncInit
export default class OfflineService {
    private request: HttpRequest;
    private storage!: Storage;
    private getCacheKey: GetCacheKey;
    private serializer: Serializer;

    constructor({ request, storage, getCacheKey, serializer }: Constructor) {
      this.request = request;
      //TODO: implement key extractor
      this.getCacheKey = getCacheKey
      this.serializer = serializer
      this.storage = storage
    }

    @aiInit
    public init = async () => {
        // console.log('Receiver init')
    }

    // ==================== Request functions ====================

    private networkOnlyRequest: RequestFunction = async (...args) => {
        const response = await this.request(...args);
        return ({ response: { ...response, serialized: await this.serializer(response) } }) as RequestResult;
    }
    
    private cacheOnlyRequest: RequestFunction = async (url, params) => {
        const cacheKey = this.getCacheKey(url, params);
        const { exist, expired, data } = await this.storage.getCacheItem(cacheKey);
        if (exist) {
            return { response: data, cacheStatus: expired ? CacheStatus.Expired : CacheStatus.Unexpired }
        } else {
            //TODO: think about format of this error
            throw "The requested data doesn't exist in the cache"
        }
    };
    
    private networkFallingBackToCacheRequest: RequestFunction = async (url, params) => {
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
    
    private cacheFallingBackToNetworkRequest: RequestFunction = async (url, params) => {
        try {
            const { response, cacheStatus } = await this.cacheOnlyRequest(url, params);
            if (cacheStatus === CacheStatus.Unexpired) {
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
    private cacheThenNetworkRequest: CacheThenNetworkRequestFunction = async (url, params) => {
        try {
            return await this.cacheOnlyRequest(url, params)
        } catch (error) {
            return { cacheStatus: CacheStatus.DoesNotExist }
        }
    }

    // ==================== Caching functions ====================

    private refreshAlwaysCaching: CachingFunction = async (url, params, data, cacheStatus) => {
        if (cacheStatus !== undefined) {
            // the data has been received from cache, we sholudn't update cache data
            return CachingResult.NotUpdated
        }
        const cacheKey = this.getCacheKey(url, params);
        try {
            await this.storage.addCacheItem(cacheKey, data);
            return CachingResult.HasBeenUpdated
        } catch (error) {
            //TODO: think
            throw error
        }
    };
    
    private refreshWhenExpiredCaching: CachingFunction = async (url, params, data, cacheStatus) => {
        if (cacheStatus !== undefined) {
            // the data has been received from cache, we sholudn't update cache data
            return CachingResult.NotUpdated
        }
    
        const cacheKey = this.getCacheKey(url, params);
        const { exist, expired, ...rest } = await this.storage.getCacheItem(cacheKey);
        if (exist && !expired) {
            return CachingResult.NotUpdated
        } else {
            await this.storage.addCacheItem(cacheKey, data);
            return CachingResult.HasBeenUpdated
        }
    
    };

    private mergeResponseWithCachedInfo: MergeResponseWithCacheInfo = (response: Response, cacheStatus: CacheStatus | undefined) => {
        return cacheStatus === undefined
            ? response 
            : { ...response, cached: true, expired: cacheStatus === CacheStatus.Expired }
    }

    @aiMethod
    public receive: CustomRequest = async (url: RequestInfo, params: RequestInitWithCacheParameters) => {
        const { 
            refreshCacheStrategy = RefreshCacheStrategy.RefreshAlways,
            requestCacheStrategy = RequestCacheStrategy.CacheFallingBackToNetwork, 
            // requestType = RequestTypes.DataReceiveRequest, 
            ...restParams 
        } = params;
        try {
            const { response, cacheStatus } = await ({
                [RequestCacheStrategy.NetworkOnly]: this.networkOnlyRequest,
                [RequestCacheStrategy.CacheOnly]: this.cacheOnlyRequest,
                [RequestCacheStrategy.NetworkFallingBackToCache]: this.networkFallingBackToCacheRequest,
                [RequestCacheStrategy.CacheFallingBackToNetwork]: this.cacheFallingBackToNetworkRequest,
                [RequestCacheStrategy.CacheThenNetwork]: this.cacheThenNetworkRequest,
            }[requestCacheStrategy] || (() => { throw 'Unknown request cache strategy' }))(url, restParams);

            if (requestCacheStrategy === RequestCacheStrategy.CacheThenNetwork) {
                return {
                    ...response ? { cached: this.mergeResponseWithCachedInfo(response, cacheStatus) } : {},
                    network: this.receive(url, { ...params, requestCacheStrategy: RequestCacheStrategy.NetworkOnly }) as Promise<ResponseWithCacheInfo>
                }
            }

            if (response!.ok) {
                try {
                    // We have not to wait cache update and we don't need the result of caching
                    // const cacheResult = await ({
                    ({
                        [RefreshCacheStrategy.NoStore]: () => {},
                        [RefreshCacheStrategy.RefreshAlways]: this.refreshAlwaysCaching,
                        [RefreshCacheStrategy.RefreshWhenExpired]: this.refreshWhenExpiredCaching,
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