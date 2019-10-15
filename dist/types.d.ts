export declare const KEY = "_";
export declare const REGISTRY_KEY: string;
export declare const SENDER_RESPONSE_KEY: string;
export declare const FUTURE_OBJECT_QUOTE = "~*foq*~";
export declare const FUTURE_ID_QUOTE = "*~fiq~*";
export declare const USED_RESPONSES_REGISTRY_KEY: string;
export declare const NETWORK_ERROR = "NetworkError";
export declare const NETWORK_ERROR_STATUS = 2;
export declare const SERVICE_ERROR = "OfflineServiceError";
export declare const SERVICE_ERROR_STATUS = 1;
export declare enum RefreshCacheStrategy {
    RefreshWhenExpired = "refresh-when-expired",
    RefreshAlways = "refresh-always",
    NoStore = "no-store"
}
export declare enum RequestCacheStrategy {
    CacheOnly = "cache-only",
    NetworkOnly = "network-only",
    CacheFallingBackToNetwork = "cache-falling-back-to-network",
    NetworkFallingBackToCache = "network-falling-back-to-cache",
    CacheThenNetwork = "cache-then-network"
}
export declare enum RequestTypes {
    DataSendRequest = "send",
    DataReceiveRequest = "receive"
}
export interface ReceiverDefaultParameters extends ReceiverLifecycleHandlers {
    refreshCacheStrategy: RefreshCacheStrategy;
    requestCacheStrategy: RequestCacheStrategy;
    ttl: number;
}
export interface ReceiverResponseWithCacheInfo extends ResponseWithCacheInfo {
    [k: string]: any;
}
export declare type ReceiverOnSuccessHandlerArgument = ReceiverResponseWithCacheInfo | CacheThenNetworkRequestStrategyResult;
export interface ReceiverOnErrorHandlerArgument {
    isNetworkError: boolean;
    [k: string]: any;
}
export interface ReceiverOnLoadingHandlerArgument {
    loading: boolean;
    network: boolean;
}
export interface ReceiverLifecycleHandlers {
    onSuccess?: (arg: ReceiverOnSuccessHandlerArgument) => any;
    onError?: (arg: ReceiverOnErrorHandlerArgument) => any;
    onLoading?: (arg: ReceiverOnLoadingHandlerArgument) => any;
    onFinally?: () => any;
}
export interface RequestInitWithCacheParameters extends RequestInit, ReceiverDefaultParameters {
    requestType?: RequestTypes;
}
export declare enum CacheStatus {
    DoesNotExist = 0,
    Unexpired = 1,
    Expired = 2
}
export interface ResponseWithCacheInfo extends Response {
    cached?: boolean;
    expired?: boolean;
}
export declare type MergeResponseWithCacheInfo = (response: Response, cacheStatus: CacheStatus | undefined) => ResponseWithCacheInfo;
export interface RequestResult {
    response: Response;
    cacheStatus?: CacheStatus;
}
export interface CacheThenNetworkRequestResult {
    response?: Response;
    cacheStatus?: CacheStatus;
}
export interface RequestFunctionInit extends ReceiverLifecycleHandlers, RequestInit {
}
export declare type RequestFunction = (url: RequestInfo, params?: RequestFunctionInit) => Promise<RequestResult>;
export declare type CacheThenNetworkRequestFunction = (url: RequestInfo, params?: RequestFunctionInit) => Promise<CacheThenNetworkRequestResult>;
export declare enum CachingResult {
    HasBeenUpdated = 0,
    NotUpdated = 1
}
export declare type CachingFunction = (url: RequestInfo, params: RequestInit | undefined, data: any, cacheStatus?: CacheStatus, ttl?: number) => Promise<CachingResult>;
export interface CacheThenNetworkRequestStrategyResult {
    cached?: ResponseWithCacheInfo;
    network: Promise<ResponseWithCacheInfo>;
}
export declare type CustomRequest = (url: RequestInfo, params: RequestInitWithCacheParameters) => Promise<ResponseWithCacheInfo | CacheThenNetworkRequestStrategyResult>;
export declare type HttpRequest = (url: RequestInfo, data?: RequestInit) => Promise<Response>;
export interface CachedItem {
    key: string;
    data: any;
    until: number;
}
export interface SenderDefaultParameters extends SenderLifecycleHandlers {
    requestTimeout: number;
}
export declare type SenderEndpoint = RequestInfo | string;
export interface SenderRequestInit extends RequestInit, SenderDefaultParameters {
    requestType?: RequestTypes;
}
export interface SenderStorageItemData {
    url: SenderEndpoint;
    params: SenderRequestInit;
    uid: UID;
}
export interface SenderStorageItem {
    id: number;
    data: SenderStorageItemData;
}
export interface SenderOnSuccessHandlerArgument {
    deferred: boolean;
    [k: string]: any;
}
export interface SenderOnErrorHandlerArgument {
    isNetworkError: boolean;
    [k: string]: any;
}
export interface SenderOnLoadingHandlerArgument {
    loading: boolean;
    deferred: boolean;
}
export interface SenderLifecycleHandlers {
    onSuccess?: (arg: SenderOnSuccessHandlerArgument) => any;
    onError?: (arg: SenderOnErrorHandlerArgument) => any;
    onLoading?: (arg: SenderOnLoadingHandlerArgument) => any;
    onFinally?: () => any;
}
export declare enum LifecycleHandlerNames {
    onSuccess = "onSuccess",
    onError = "onError",
    onLoading = "onLoading",
    onFinally = "onFinally"
}
export interface StorageAccessors {
    set: ((key: string, data: CachedItem | SenderStorageItem | any) => Promise<boolean>);
    get: ((key: string) => Promise<null | CachedItem | SenderStorageItem | any>);
    multiGet: (keys: string[]) => Promise<(null | CachedItem | SenderStorageItem)[]>;
    remove: (key: string) => Promise<boolean>;
    multiRemove: (keys: string[]) => Promise<boolean>;
    getAllKeys: () => Promise<string[]>;
}
export declare type GetCacheKey = (url: RequestInfo, params?: RequestInit) => string;
export declare type UID = string;
export interface UsedResponseRegistry {
    [requesterUID: string]: UID[];
}
export interface ResolvedResponses {
    uid: UID;
    result?: any;
    error?: any;
}
export declare type CreateError = (arg: {
    name: string;
    message: string;
    status: string | number;
    [k: string]: any;
}) => any;
export declare type ThrowNetworkError = () => void;
export declare type RequestPromise = Promise<Response>;
export declare type RequestHandler = (arg: {
    throwNetworkError: ThrowNetworkError;
    requestPromise: RequestPromise;
}) => any;
