export const KEY = '_' // '__offline__'
export const REGISTRY_KEY = KEY + 'reg' // 'registry'
export const SENDER_RESPONSE_KEY = KEY + 's_' // 'send__'
export const FUTURE_OBJECT_QUOTE = '~*foq*~'
export const FUTURE_ID_QUOTE = '*~fiq~*'
export const USED_RESPONSES_REGISTRY_KEY = KEY + 'urr' // 'used_responses_registry'

export const NETWORK_ERROR = 'NetworkError'
export const NETWORK_ERROR_STATUS = 2
export const SERVICE_ERROR = 'OfflineServiceError'
export const SERVICE_ERROR_STATUS = 1

// type RegistryKey1 = '__offline__registry'
// type RegistryKey = typeof REGISTRY_KEY

export enum RefreshCacheStrategy {
  RefreshWhenExpired = 'refresh-when-expired',
  RefreshAlways = 'refresh-always',
  NoStore = 'no-store'
}

export enum RequestCacheStrategy {
  CacheOnly = 'cache-only',
  NetworkOnly = 'network-only',
  CacheFallingBackToNetwork = 'cache-falling-back-to-network',
  NetworkFallingBackToCache = 'network-falling-back-to-cache',
  CacheThenNetwork = 'cache-then-network'
}

export enum RequestTypes {
  DataSendRequest = 'send',
  DataReceiveRequest = 'receive'
}

export interface ReceiverDefaultParameters extends ReceiverLifecycleHandlers {
  refreshCacheStrategy: RefreshCacheStrategy,
  requestCacheStrategy: RequestCacheStrategy,
  ttl: number
}

export interface ReceiverResponseWithCacheInfo extends ResponseWithCacheInfo {
  [k: string]: any
}

export type ReceiverOnSuccessHandlerArgument = ReceiverResponseWithCacheInfo | CacheThenNetworkRequestStrategyResult;

export interface ReceiverOnErrorHandlerArgument {
  isNetworkError: boolean,
  [k: string]: any
}

export interface ReceiverOnLoadingHandlerArgument {
  loading: boolean,
  network: boolean
}

export interface ReceiverLifecycleHandlers {
  onSuccess?: (arg: ReceiverOnSuccessHandlerArgument) => any,
  onError?: (arg: ReceiverOnErrorHandlerArgument) => any,
  onLoading?: (arg: ReceiverOnLoadingHandlerArgument) => any,
  onFinally?: () => any
}

export interface RequestInitWithCacheParameters extends RequestInit, ReceiverDefaultParameters {
  // refreshCacheStrategy?: RefreshCacheStrategy,
  // requestCacheStrategy?: RequestCacheStrategy,
  requestType?: RequestTypes
}

export enum CacheStatus {
  DoesNotExist,
  Unexpired,
  Expired,
}

export interface ResponseWithCacheInfo extends Response {
  cached?: boolean,
  expired?: boolean
}

export type MergeResponseWithCacheInfo = (response: Response, cacheStatus: CacheStatus | undefined) => ResponseWithCacheInfo;

export interface RequestResult {
  response: Response,
  cacheStatus?: CacheStatus
}

export interface CacheThenNetworkRequestResult {
  response?: Response,
  cacheStatus?: CacheStatus
}

export interface RequestFunctionInit extends ReceiverLifecycleHandlers, RequestInit {}

export type RequestFunction = (url: RequestInfo, params?: RequestFunctionInit) => Promise<RequestResult>;

export type CacheThenNetworkRequestFunction = (url: RequestInfo, params?: RequestFunctionInit) => Promise<CacheThenNetworkRequestResult>;

export enum CachingResult {
  // HasBeenAdded,
  HasBeenUpdated,
  NotUpdated
}

export type CachingFunction = (url: RequestInfo, params: RequestInit | undefined, data: any, cacheStatus?: CacheStatus, ttl?: number) => Promise<CachingResult>;

export interface CacheThenNetworkRequestStrategyResult {
  cached?: ResponseWithCacheInfo,
  network: Promise<ResponseWithCacheInfo>
}

export type CustomRequest = (url: RequestInfo, params: RequestInitWithCacheParameters) => Promise<ResponseWithCacheInfo | CacheThenNetworkRequestStrategyResult>;

export type HttpRequest = (url: RequestInfo, data?: RequestInit) => Promise<Response>;

export interface CachedItem {
  key: string,
  data: any, // Response
  until: number
}




export interface SenderDefaultParameters extends SenderLifecycleHandlers {
  requestTimeout: number
}

export type SenderEndpoint = RequestInfo | string

export interface SenderRequestInit extends RequestInit, SenderDefaultParameters {
  requestType?: RequestTypes
}

export interface SenderStorageItemData {
  url: SenderEndpoint,
  params: SenderRequestInit,
  uid: UID
}

export interface SenderStorageItem {
  id: number,
  data: SenderStorageItemData
}



export interface SenderOnSuccessHandlerArgument {
  deferred: boolean,
  [k: string]: any
}

export interface SenderOnErrorHandlerArgument {
  isNetworkError: boolean,
  [k: string]: any
}

export interface SenderOnLoadingHandlerArgument {
  loading: boolean,
  deferred: boolean
}

export interface SenderLifecycleHandlers {
  onSuccess?: (arg: SenderOnSuccessHandlerArgument) => any,
  onError?: (arg: SenderOnErrorHandlerArgument) => any,
  onLoading?: (arg: SenderOnLoadingHandlerArgument) => any,
  onFinally?: () => any
}


//TODO: add methods
export interface StorageAccessors {
  set: ((key: string, data: CachedItem | SenderStorageItem | any) => Promise<boolean>),
  get: ((key: string) => Promise<null | CachedItem | SenderStorageItem | any>),
  multiGet: (keys: string[]) => Promise<(null | CachedItem | SenderStorageItem)[]>,
  remove: (key: string) => Promise<boolean>,
}

export type GetCacheKey = (url: RequestInfo, params?: RequestInit) => string;

export type UID = string;

export interface UsedResponseRegistry {
  [requesterUID: string]: UID[]
}

export type CreateError = (arg: { name: string, message: string, status: string | number, [k: string]: any }) => any;

export type ThrowNetworkError = () => void;

export type RequestPromise = Promise<Response>;

export type RequestHandler = (arg: { throwNetworkError: ThrowNetworkError, requestPromise: RequestPromise }) => any;

//TODO: export types from module