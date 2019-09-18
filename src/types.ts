export const KEY = '__offline__'
export const REGISTRY_KEY = KEY + 'registry'

type RegistryKey1 = '__offline__registry'
type RegistryKey = typeof REGISTRY_KEY

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

export interface RequestInitWithCacheParameters extends RequestInit {
  refreshCacheStrategy?: RefreshCacheStrategy,
  requestCacheStrategy?: RequestCacheStrategy,
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

export type RequestFunction = (url: RequestInfo, params?: RequestInit) => Promise<RequestResult>;

export type CacheThenNetworkRequestFunction = (url: RequestInfo, params?: RequestInit) => Promise<CacheThenNetworkRequestResult>;

export enum CachingResult {
  // HasBeenAdded,
  HasBeenUpdated,
  NotUpdated
}

export type CachingFunction = (url: RequestInfo, params: RequestInit | undefined, data: any, cacheStatus?: CacheStatus) => Promise<CachingResult>;

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

export type SenderEndpoint = RequestInfo | string

export type SenderRequestInit = RequestInit

export interface SenderStorageItemData {
  url: SenderEndpoint,
  params: SenderRequestInit
}

export interface SenderStorageItem {
  id: number,
  data: SenderStorageItemData
}

export interface StorageAccessors {
  //TODO: return result 
  set: 
    ((key: string, data: CachedItem | SenderStorageItem | any) => Promise<boolean>),
    //| ((key: RegistryKey, data: number[]) => Promise<boolean>),
  get: 
    ((key: string) => Promise<null | CachedItem | SenderStorageItem | any>),
    //| ((key: RegistryKey) => Promise<number[]>),
  multiGet: (keys: string[]) => Promise<(null | CachedItem | SenderStorageItem)[]>,
  delete: (key: string) => Promise<boolean>,
}

export type GetCacheKey = (url: RequestInfo, params?: RequestInit) => string;

export type Serializer = (response: Response) => any;
