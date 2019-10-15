// export * from './service';
export { default as default } from './service';
export { RefreshCacheStrategy, RequestCacheStrategy, RequestTypes } from './types';

import { CacheThenNetworkRequestStrategyResult, ResponseWithCacheInfo } from './types'
export type CacheThenNetworkRequestStrategyResult = CacheThenNetworkRequestStrategyResult
export interface ResponseWithCacheInfo extends ResponseWithCacheInfo {}