import httpRequest from './http';

import storage from './storage';

//TODO: implement key extractor
const getCacheKey = (url: RequestInfo, params?: RequestInit) => String(url).slice(1);

export enum RefreshCacheStrategy {
    RefreshWhenExpired,
    RefreshAlways,
    NoStore
}

export enum RequestCacheStrategy {
    CacheOnly,
    NetworkOnly,
    CacheFallingBackToNetwork,
    NetworkFallingBackToCache,
    CacheThenNetwork
}

export enum RequestTypes {
    DataSendRequest,
    DataReceiveRequest
}

interface RequestInitWithCacheParameters extends RequestInit {
    refreshCacheStrategy?: RefreshCacheStrategy,
    requestCacheStrategy?: RequestCacheStrategy,
    requestType?: RequestTypes
}

// interface CachedInfo {
//     until: number
// }

enum CacheStatus {
    DoesNotExist,
    Unexpired,
    Expired,
}

interface RequestResult {
    response: Response,
    cacheStatus?: CacheStatus
}

interface CacheThenNetworkRequestResult {
    response?: Response,
    cacheStatus?: CacheStatus
}

type RequestFunction = (url: RequestInfo, params?: RequestInit) => Promise<RequestResult>;
type CacheThenNetworkRequestFunction = (url: RequestInfo, params?: RequestInit) => Promise<CacheThenNetworkRequestResult>;

const NetworkOnlyRequest: RequestFunction = async (...args) => {
    return ({ response: await httpRequest(...args) }) as RequestResult;
}

const CacheOnlyRequest: RequestFunction = async (url, params) => {
    const cacheKey = getCacheKey(url, params);
    const { exist, expired, data } = await storage.retrieve(cacheKey);
    if (exist) {
        return { response: data, cacheStatus: expired ? CacheStatus.Expired : CacheStatus.Unexpired }
    } else {
        //TODO: think about format of this error
        throw "The requested data doesn't exist in the cache"
    }
};

const NetworkFallingBackToCacheRequest: RequestFunction = async (url, params) => {
    try {
        const { response } = await NetworkOnlyRequest(url, params);
        if (response.ok) {
            return { response }
        } else {
            throw response
        }
    } catch (networkError) {
        try {
            return CacheOnlyRequest(url, params);
        } catch (cacheError) {
            //TODO: think about format of this error, maybe provide networkError somehow...
            throw "The network request has been failed but cached data doesn't exist"
        }
    }
};

const CacheFallingBackToNetworkRequest: RequestFunction = async (url, params) => {
    try {
        const { response, cacheStatus } = await CacheOnlyRequest(url, params);
        if (cacheStatus === CacheStatus.Unexpired) {
            return { response, cacheStatus }
        } else {
            throw "The cache data is expired"
        }
    } catch (cacheError) {
        try {
            return NetworkOnlyRequest(url, params);
        } catch (networkError) {
            //TODO: think about format of this error, maybe provide networkError somehow...
            throw "The cache doesn't exist or expired but network request has been faild"
        }
    }
}

// it returns cached data and promise for network request
const CacheThenNetworkRequest: CacheThenNetworkRequestFunction = async (url, params) => {
    try {
        return CacheOnlyRequest(url, params)
    } catch (error) {
        return { cacheStatus: CacheStatus.DoesNotExist }
    }
}

enum CachingResult {
    // HasBeenAdded,
    HasBeenUpdated,
    NotUpdated
}

type CachingFunction = (url: RequestInfo, params: RequestInit | undefined, data: any, cacheStatus?: CacheStatus) => Promise<CachingResult>;

const RefreshAlwaysCaching: CachingFunction = async (url, params, data, cacheStatus) => {
    if (cacheStatus !== undefined) {
        // the data has been received from cache, we sholudn't update cache data
        return CachingResult.NotUpdated
    }
    const cacheKey = getCacheKey(url, params);
    try {
        await storage.add(cacheKey, data);
        return CachingResult.HasBeenUpdated
    } catch (error) {
        //TODO: think
        throw error
    }
};

const RefreshWhenExpiredCaching: CachingFunction = async (url, params, data, cacheStatus) => {
    if (cacheStatus !== undefined) {
        // the data has been received from cache, we sholudn't update cache data
        return CachingResult.NotUpdated
    }

    const cacheKey = getCacheKey(url, params);
    const { exist, expired, ...rest } = await storage.retrieve(cacheKey);
    if (exist && !expired) {
        return CachingResult.NotUpdated
    } else {
        await storage.add(cacheKey, data);
        return CachingResult.HasBeenUpdated
    }

};

export interface CacheThenNetworkRequestStrategyResult {
    cached?: Response,
    network: Promise<Response>
}

type CustomRequest = (url: RequestInfo, params: RequestInitWithCacheParameters) => Promise<Response | CacheThenNetworkRequestStrategyResult>;

const request: CustomRequest = async (url: RequestInfo, params: RequestInitWithCacheParameters) => {
    const { 
        refreshCacheStrategy = RefreshCacheStrategy.RefreshAlways,
        requestCacheStrategy = RequestCacheStrategy.CacheFallingBackToNetwork, 
        requestType = RequestTypes.DataReceiveRequest, 
        ...restParams 
    } = params;
    if (requestType === RequestTypes.DataReceiveRequest) {
        try {
            const { response, cacheStatus } = await ({
                [RequestCacheStrategy.NetworkOnly]: NetworkOnlyRequest,
                [RequestCacheStrategy.CacheOnly]: CacheOnlyRequest,
                [RequestCacheStrategy.NetworkFallingBackToCache]: NetworkFallingBackToCacheRequest,
                [RequestCacheStrategy.CacheFallingBackToNetwork]: CacheFallingBackToNetworkRequest,
                [RequestCacheStrategy.CacheThenNetwork]: CacheThenNetworkRequest,
            }[requestCacheStrategy] || (() => { throw 'Unknown request cache strategy' }))(url, restParams);

            if (requestCacheStrategy === RequestCacheStrategy.CacheThenNetwork) {
                return {
                    ...response ? { cached: response } : {},
                    network: request(url, { ...params, requestCacheStrategy: RequestCacheStrategy.NetworkOnly }) as Promise<Response>
                }
            }

            if (response!.ok) {
                try {
                    const cacheResult = await ({
                        [RefreshCacheStrategy.NoStore]: () => {},
                        [RefreshCacheStrategy.RefreshAlways]: RefreshAlwaysCaching,
                        [RefreshCacheStrategy.RefreshWhenExpired]: RefreshWhenExpiredCaching,
                    }[refreshCacheStrategy] || (() => { throw 'Unknown refresh cache strategy' }))(url, restParams, response, cacheStatus);
                    
                    return response as Response;

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

    } else if (requestType === RequestTypes.DataSendRequest) {
        // TODO: big work!!!!!!!
        throw 'TODO'
    } else {
        throw 'Unknown request type';
    }
}

export default request;
