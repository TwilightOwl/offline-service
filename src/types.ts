export const KEY = '_' 
export const RECEIVER_RESPONSE_KEY = KEY + 'r_' 
export const REGISTRY_KEY = KEY + 'reg' 
export const SENDER_RESPONSE_KEY = KEY + 's_' 
export const FUTURE_OBJECT_QUOTE = '~*foq*~'
export const FUTURE_ID_QUOTE = '*~fiq~*'
export const USED_RESPONSES_REGISTRY_KEY = KEY + 'urr' 

export const NETWORK_ERROR = 'NetworkError'
export const NETWORK_ERROR_STATUS = 2
export const NETWORK_ERROR_REQUEST_HAS_FAILED = 'Network request has failed'
export const SERVICE_ERROR = 'OfflineServiceError'
export const SERVICE_ERROR_STATUS = 1
export const SERVICE_ERROR_CACHE_RETRIEVING_FAILED =
  'The requested data doesn\'t exist in the cache'
export const SERVICE_ERROR_NETWORK_THEN_CACHE_RETRIEVING_FAILED = 
  'The network request has been failed but cached data doesn\'t exist'
export const SERVICE_ERROR_CACHE_THEN_NETWORK_RETRIEVING_FAILED = 
  'The cache doesn\'t exist or expired but network request has been failed'
export const SERVICE_ERROR_UNKNOWN_REQUEST_CACHE_STRATEGY = 
  'Unknown request cache strategy'
export const SERVICE_ERROR_UNKNOWN_REFRESH_CACHE_STRATEGY =
  'Unknown refresh cache strategy'
export const SERVICE_ERROR_CACHING_FAILED =
  'Caching has been failed'


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

export interface ReceiverDefaultParameters {
  refreshCacheStrategy: RefreshCacheStrategy,
  requestCacheStrategy: RequestCacheStrategy,
  ttl: number,
  cleanUnusedAfter: number,
  waitForCacheStoring?: boolean
}

export interface DefaultParameters {
  send?: SenderDefaultParameters,
  receive?: ReceiverDefaultParameters
}

type ReceiverResponseWithCacheInfo = ResponseWithCacheInfo & {
  [k: string]: any;
};

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

export interface RequestInitWithCacheParameters extends RequestInit, ReceiverDefaultParameters, ReceiverLifecycleHandlers {
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
  HasBeenUpdated,
  NotUpdated
}

export type CachingFunction = (url: RequestInfo, params: RequestInit | undefined, data: any, cacheStatus?: CacheStatus, ttl?: number, cleanUnusedAfter?: number) => Promise<CachingResult>;

export interface CacheThenNetworkRequestStrategyResult {
  cached?: ResponseWithCacheInfo,
  network: Promise<ResponseWithCacheInfo>
}

export type CustomRequest = (url: RequestInfo, params: RequestInitWithCacheParameters) => Promise<ResponseWithCacheInfo | CacheThenNetworkRequestStrategyResult>;

export type HttpRequest = (url: RequestInfo, data?: RequestInit) => Promise<Response>;

export interface CachedItem {
  key: string,
  data: any,
  until: number,
  used: number,
  after: number,
}

export interface SenderDefaultParameters {
  requestTimeout: number
}

export type SenderEndpoint = RequestInfo | string

export interface SenderRequestInit extends RequestInit, SenderDefaultParameters, SenderLifecycleHandlers {
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

export enum LifecycleHandlerNames {
  onSuccess = 'onSuccess',
  onError = 'onError',
  onLoading = 'onLoading',
  onFinally = 'onFinally',
}


export interface StorageAccessors {
  set: ((key: string, data: CachedItem | SenderStorageItem | any) => Promise<boolean>),
  get: ((key: string) => Promise<null | CachedItem | SenderStorageItem | any>),
  multiGet: (keys: string[]) => Promise<(null | CachedItem | SenderStorageItem)[]>,
  remove: (key: string) => Promise<boolean>,
  multiRemove: (keys: string[]) => Promise<boolean>,
  getAllKeys: () => Promise<string[]>
}

export type GetCacheKey = (url: RequestInfo, params?: RequestInit) => string;

export type UID = string;

export interface UsedResponseRegistry {
  [requesterUID: string]: UID[]
}

export interface ResolvedResponses {
  uid: UID,
  result?: any,
  error?: any
}

export type CreateError = (arg: { name: string, message: string, status: string | number, [k: string]: any }) => any;

export type ThrowNetworkError = () => void;

export type RequestPromise = Promise<Response>;

export type RequestHandler = (arg: { throwNetworkError: ThrowNetworkError, requestPromise: RequestPromise }) => any;
