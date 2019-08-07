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

enum CacheStatus {
    DoesNotExist,
    Unexpired,
    Expired,
}

export interface ResponseWithCacheInfo extends Response {
    cached?: boolean,
    expired?: boolean
}

type MergeResponseWithCacheInfo = (response: Response, cacheStatus: CacheStatus | undefined) => ResponseWithCacheInfo;

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

enum CachingResult {
    // HasBeenAdded,
    HasBeenUpdated,
    NotUpdated
}

type CachingFunction = (url: RequestInfo, params: RequestInit | undefined, data: any, cacheStatus?: CacheStatus) => Promise<CachingResult>;

export interface CacheThenNetworkRequestStrategyResult {
    cached?: ResponseWithCacheInfo,
    network: Promise<ResponseWithCacheInfo>
}

type CustomRequest = (url: RequestInfo, params: RequestInitWithCacheParameters) => Promise<ResponseWithCacheInfo | CacheThenNetworkRequestStrategyResult>;

type HttpRequest = (url: RequestInfo, data?: RequestInit) => Promise<Response>;

interface CachedItem {
    key: string,
    data: any, // Response
    until: number
}

interface Storage {
    //TODO: return result 
    set: (key: string, data: CachedItem) => Promise<boolean>,
    get: (key: string) => Promise<null | CachedItem>,
    delete: (key: string) => Promise<boolean>,
}

type GetCacheKey = (url: RequestInfo, params?: RequestInit) => string;

interface Constructor {
    request: HttpRequest,
    storage: Storage,
    getCacheKey: GetCacheKey
}

export default class OfflineService {
    private httpRequest: HttpRequest;
    private storage: Storage;
    private getCacheKey: GetCacheKey;

    constructor({ request, storage, getCacheKey }: Constructor) {
        this.httpRequest = request;
        this.storage = storage;
        //TODO: implement key extractor
        this.getCacheKey = getCacheKey;
    }

    // ==================== Storage functions ====================
     
    private setCacheItem = async (key: string, data: any, ttl = 10000) => {
        return this.storage.set(key, { key, data, until: Date.now() + ttl });
    }

    private getCacheItem = async (key: string) => {
        const cached = await this.storage.get(key);
        if (cached === null) {
            return { exist: false }
        } else {
            return { 
                exist: true, 
                expired: cached.until < Date.now(), 
                data: cached.data 
            };
        }
    }

    // ==================== Request functions ====================

    private networkOnlyRequest: RequestFunction = async (...args) => {
        return ({ response: await this.httpRequest(...args) }) as RequestResult;
    }
    
    private cacheOnlyRequest: RequestFunction = async (url, params) => {
        const cacheKey = this.getCacheKey(url, params);
        const { exist, expired, data } = await this.getCacheItem(cacheKey);
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
            await this.setCacheItem(cacheKey, data);
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
        const { exist, expired, ...rest } = await this.getCacheItem(cacheKey);
        if (exist && !expired) {
            return CachingResult.NotUpdated
        } else {
            await this.setCacheItem(cacheKey, data);
            return CachingResult.HasBeenUpdated
        }
    
    };

    private mergeResponseWithCachedInfo: MergeResponseWithCacheInfo = (response: Response, cacheStatus: CacheStatus | undefined) => {
        return cacheStatus === undefined
            ? response 
            : { ...response, cached: true, expired: cacheStatus === CacheStatus.Expired }
    }

    public request: CustomRequest = async (url: RequestInfo, params: RequestInitWithCacheParameters) => {
        const { 
            refreshCacheStrategy = RefreshCacheStrategy.RefreshAlways,
            requestCacheStrategy = RequestCacheStrategy.CacheFallingBackToNetwork, 
            requestType = RequestTypes.DataReceiveRequest, 
            ...restParams 
        } = params;
        if (requestType === RequestTypes.DataReceiveRequest) {
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
                        network: this.request(url, { ...params, requestCacheStrategy: RequestCacheStrategy.NetworkOnly }) as Promise<ResponseWithCacheInfo>
                    }
                }
    
                if (response!.ok) {
                    try {
                        const cacheResult = await ({
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
    
        } else if (requestType === RequestTypes.DataSendRequest) {
            // TODO: big work!!!!!!!
            throw 'TODO'
        } else {
            throw 'Unknown request type';
        }
    }
}