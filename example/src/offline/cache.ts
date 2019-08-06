import request from './http';

import storage from './storage';

//TODO: implement key extractor
const getCacheKey = (url: RequestInfo, params?: RequestInit) => String(url);

enum RefreshCacheStrategy {
    RefreshWhenExpired,
    RefreshAlways,
    NoStore
}

enum RequestCacheStrategy {
    CacheOnly,
    NetworkOnly,
    CacheFallingBackToNetwork,
    NetworkFallingBackToCache,
    CacheThenNetwork
}

enum RequestTypes {
    DataSendRequest,
    DataReceiveRequest
}

interface RequestInitWithCacheParameters extends RequestInit {
    refreshCacheStrategy: RefreshCacheStrategy,
    requestCacheStrategy: RequestCacheStrategy,
    requestType: RequestTypes
}

interface CachedInfo {
    ttl: Date
}

interface RequestResult {
    response: Response,
    cachedInfo?: CachedInfo
}

type RequestFunction = (url: RequestInfo, params?: RequestInit) => Promise<RequestResult>;

const NetworkOnlyRequest: RequestFunction = async (...args) => ({ response: await fetch(...args) });

const CacheOnlyRequest: RequestFunction = async (url, params) => ({ response: await fetch(url, params) });

const NetworkFallingBackToCacheRequest: RequestFunction = async (url, params) => ({ response: await fetch(url, params) });

const CacheFallingBackToNetworkRequest: RequestFunction = async (url, params) => ({ response: await fetch(url, params) });

const CacheThenNetworkRequest: RequestFunction = async (url, params) => ({ response: await fetch(url, params) });

enum CachingResult {
    HasBeenAdded,
    HasBeenUpdated
}

type CachingFunction = (url: RequestInfo, params: RequestInit | undefined, data: any, cachedInfo: CachedInfo) => Promise<CachingResult>;

const RefreshAlwaysCaching: CachingFunction = async (url, params, data, cachedInfo) => {
    const cacheKey = getCacheKey(url, params);
    return CachingResult.HasBeenAdded
};

const RefreshWhenExpiredCaching: CachingFunction = async (url, params, data, cachedInfo) => {
    const cacheKey = getCacheKey(url, params);
    return CachingResult.HasBeenAdded
};

const req = async (url: RequestInfo, params: RequestInitWithCacheParameters) => {
    const { 
        refreshCacheStrategy = RefreshCacheStrategy.RefreshWhenExpired,
        requestCacheStrategy = RequestCacheStrategy.CacheFallingBackToNetwork, 
        requestType = RequestTypes.DataReceiveRequest, 
        ...restParams 
    } = params;
    if (requestType === RequestTypes.DataReceiveRequest) {
        try {
            const { response, cachedInfo } = await ({
                [RequestCacheStrategy.NetworkOnly]: NetworkOnlyRequest,
                [RequestCacheStrategy.CacheOnly]: CacheOnlyRequest,
                [RequestCacheStrategy.NetworkFallingBackToCache]: NetworkFallingBackToCacheRequest,
                [RequestCacheStrategy.CacheFallingBackToNetwork]: CacheFallingBackToNetworkRequest,
                [RequestCacheStrategy.CacheThenNetwork]: CacheThenNetworkRequest,
            }[requestCacheStrategy] || (() => { throw 'Unknown request cache strategy' }))(url, restParams);
            if (response.ok) {
                
                try {
                    const cacheResult = await ({
                        [RefreshCacheStrategy.NoStore]: () => {},
                        [RefreshCacheStrategy.RefreshAlways]: RefreshAlwaysCaching,
                        [RefreshCacheStrategy.RefreshWhenExpired]: RefreshWhenExpiredCaching,
                    }[refreshCacheStrategy] || (() => { throw 'Unknown refresh cache strategy' }))(url, restParams, response, cachedInfo);
                    
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

        if (requestCacheStrategy === RequestCacheStrategy.NetworkOnly) {
            const result = await fetch(url, restParams);

        } else if (requestCacheStrategy === RequestCacheStrategy.CacheOnly) {

        } else if (requestCacheStrategy === RequestCacheStrategy.NetworkFallingBackToCache) {

        } else if (requestCacheStrategy === RequestCacheStrategy.CacheFallingBackToNetwork) {

        } else if (requestCacheStrategy === RequestCacheStrategy.CacheThenNetwork) {

        } else {
            throw 'Unknown cache strategy';
        }
    } else if (requestType === RequestTypes.DataSendRequest) {

    } else {
        throw 'Unknown request type';
    }
}

export const receive = async (url: string, data: any) => {
    const cacheKey = getCacheKey(url, data);
    const cached = await storage.retrieve(cacheKey);
    if (cached === undefined) {
        const result = await request(url, data);
        // unblocking promise
        storage.add(cacheKey, result);
        return result;
    } else {
        return cached
    }
}

