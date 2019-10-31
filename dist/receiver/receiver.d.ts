import Storage from '../storage';
import * as Types from '../types';
interface Constructor {
    request: Types.HttpRequest;
    storage: Storage;
    getCacheKey: Types.GetCacheKey;
    requestHandler: Types.RequestHandler;
    createError: Types.CreateError;
    defaultParameters: Types.ReceiverDefaultParameters;
}
export default class OfflineService {
    private request;
    private storage;
    private getCacheKey;
    private requestHandler;
    private createError;
    private defaultParameters;
    constructor({ request, storage, getCacheKey, requestHandler, createError, defaultParameters }: Constructor);
    init(): Promise<void>;
    private createServiceError;
    private networkOnlyRequest;
    private cacheOnlyRequest;
    private networkFallingBackToCacheRequest;
    private cacheFallingBackToNetworkRequest;
    private cacheThenNetworkRequest;
    private refreshAlwaysCaching;
    private refreshWhenExpiredCaching;
    private mergeResponseWithCachedInfo;
    receive(url: RequestInfo, params: Types.RequestInitWithCacheParameters): Promise<Types.ResponseWithCacheInfo | Types.CacheThenNetworkRequestStrategyResult | undefined>;
}
export {};
