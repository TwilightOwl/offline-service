import * as Types from './types';
interface Constructor {
    request: Types.HttpRequest;
    storageAccessors: Types.StorageAccessors;
    getCacheKey: Types.GetCacheKey;
    requestHandler: Types.RequestHandler;
    createError: Types.CreateError;
    defaultParameters: {
        send: {
            requestTimeout: number;
        };
        receive: {
            refreshCacheStrategy: Types.RefreshCacheStrategy;
            requestCacheStrategy: Types.RequestCacheStrategy;
            ttl: number;
        };
    };
}
export default class OfflineService {
    private storage;
    private sender;
    private receiver;
    constructor({ request, storageAccessors, getCacheKey, defaultParameters, requestHandler, createError }: Constructor);
    init(): Promise<void>;
    finalize(): Promise<void>;
    request(url: RequestInfo, params: Types.RequestInitWithCacheParameters | Types.SenderRequestInit): Promise<any>;
}
export {};
