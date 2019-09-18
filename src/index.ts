// export * from './service';
export { default as default } from './service';

export { RefreshCacheStrategy, RequestCacheStrategy, RequestTypes } from './types';

//export * from './types';

// import * as Types from './types';
// Types.CachedItem
// export {
//   Types.CachedItem as CacheThenNetworkRequestStrategyResult, 
//   ResponseWithCacheInfo
// }

import { CacheThenNetworkRequestStrategyResult, ResponseWithCacheInfo } from './types'
export type CacheThenNetworkRequestStrategyResult = CacheThenNetworkRequestStrategyResult
export interface ResponseWithCacheInfo extends ResponseWithCacheInfo {}