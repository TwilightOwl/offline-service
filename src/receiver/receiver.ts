import { aiWithAsyncInit, aiMethod, aiInit } from 'asynchronous-tools';

import { IStorage } from '../storage';
import * as Types from '../types';

interface Constructor {
  request: Types.HttpRequest,
  storage: IStorage,
  getCacheKey: Types.GetCacheKey,
  requestHandler: Types.RequestHandler,
  createError: Types.CreateError,
  defaultParameters: Types.ReceiverDefaultParameters
}

@aiWithAsyncInit
export default class OfflineService {
  private request: Types.HttpRequest;
  private storage!: IStorage;
  private getCacheKey: Types.GetCacheKey;
  private requestHandler: Types.RequestHandler;
  private createError: Types.CreateError;
  private defaultParameters: Types.ReceiverDefaultParameters

  constructor({ request, storage, getCacheKey, requestHandler, createError, defaultParameters }: Constructor) {
    this.request = request;
    this.getCacheKey = getCacheKey
    this.requestHandler = requestHandler
    this.createError = createError
    this.storage = storage
    this.defaultParameters = defaultParameters
  }

  @aiInit
  public async init() {}

  private createServiceError = (message: string) => this.createError({ 
    name: Types.SERVICE_ERROR,
    message,
    status: Types.SERVICE_ERROR_STATUS
  })

  // ==================== Request functions ====================

  private networkOnlyRequest: Types.RequestFunction = async (url, params) => {
    const {
      onSuccess = undefined,
      onLoading = undefined,
      onError = undefined,
      onFinally = undefined,
      ...restParams
    } = params || {}
    try {
      onLoading && onLoading({ loading: true, network: true })
      
      const response = await this.requestHandler({
        throwNetworkError: () => { throw Types.NETWORK_ERROR },
        requestPromise: this.request(url, restParams)
      })

      onSuccess && onSuccess(response)
      return { response }
    } catch (error) {
      onError && onError(error === Types.NETWORK_ERROR 
        ? this.createError({ 
          name: Types.NETWORK_ERROR,
          message: Types.NETWORK_ERROR_REQUEST_HAS_FAILED,
          status: Types.NETWORK_ERROR_STATUS,
          isNetworkError: true
        })
        : { ...error, isNetworkError: false }
      )
      throw error
    } finally {
      onLoading && onLoading({ loading: false, network: true })
    }       
  }
  
  private cacheOnlyRequest: Types.RequestFunction = async (url, params) => {
    const {
      onSuccess = undefined,
      onLoading = undefined,
      onError = undefined,
      onFinally = undefined,
      ...restParams
    } = params || {}

    onLoading && onLoading({ loading: true, network: false })

    const cacheKey = this.getCacheKey(url, restParams);
    const { exist, expired, data } = await this.storage.getCacheItem(cacheKey);

    onLoading && onLoading({ loading: false, network: false })

    if (exist) {
      const result = { response: data, cacheStatus: expired ? Types.CacheStatus.Expired : Types.CacheStatus.Unexpired }
      onSuccess && onSuccess(this.mergeResponseWithCachedInfo(result.response, result.cacheStatus))
      return result
    } else {
      const error = this.createServiceError(Types.SERVICE_ERROR_CACHE_RETRIEVING_FAILED)
      onError && onError({ ...error, isNetworkError: false })
      throw error
    }
  };
  
  private networkFallingBackToCacheRequest: Types.RequestFunction = async (url, params) => {
    try {
      return await this.networkOnlyRequest(url, params);
    } catch (error) {
      // error is not network error only!
      try {
        // without "await" catch block will not handle exception!
        return await this.cacheOnlyRequest(url, params);
      } catch (cacheError) {
        throw this.createServiceError(Types.SERVICE_ERROR_NETWORK_THEN_CACHE_RETRIEVING_FAILED)
      }
    }
  };
  
  private cacheFallingBackToNetworkRequest: Types.RequestFunction = async (url, params) => {
    try {
      const { response, cacheStatus } = await this.cacheOnlyRequest(url, params);
      if (cacheStatus === Types.CacheStatus.Unexpired) {
        return { response, cacheStatus }
      } else {
        throw "The cache data is expired"
      }
    } catch (cacheError) {
      try {
        return await this.networkOnlyRequest(url, params);
      } catch (error) {
        // without "await" catch block will not handle exception!
        throw this.createServiceError(Types.SERVICE_ERROR_CACHE_THEN_NETWORK_RETRIEVING_FAILED)
      }
    }
  }
  
  // It's just a first part of algorythm, in the "request" method a second part will be invoked 
  //   by recursive call of "request" with NetworkOnly strategy
  private cacheThenNetworkRequest: Types.CacheThenNetworkRequestFunction = async (url, params) => {
    try {
      return await this.cacheOnlyRequest(url, params)
    } catch (error) {
      return { cacheStatus: Types.CacheStatus.DoesNotExist }
    }
  }


  // ==================== Caching functions ====================

  private refreshAlwaysCaching: Types.CachingFunction = async (url, params, data, cacheStatus, ttl, cleanUnusedAfter) => {
    if (cacheStatus !== undefined) {
      // the data has been received from cache, we sholudn't update cache data
      return Types.CachingResult.NotUpdated
    }
    const cacheKey = this.getCacheKey(url, params);
    try {
      await this.storage.addCacheItem(cacheKey, data, ttl, cleanUnusedAfter);
      return Types.CachingResult.HasBeenUpdated
    } catch (error) {
      throw error
    }
  };
  
  private refreshWhenExpiredCaching: Types.CachingFunction = async (url, params, data, cacheStatus, ttl, cleanUnusedAfter) => {
    if (cacheStatus !== undefined) {
      // the data has been received from cache, we sholudn't update cache data
      return Types.CachingResult.NotUpdated
    }
  
    const cacheKey = this.getCacheKey(url, params);
    const { exist, expired } = await this.storage.getCacheItem(cacheKey);
    if (exist && !expired) {
      return Types.CachingResult.NotUpdated
    } else {
      await this.storage.addCacheItem(cacheKey, data, ttl, cleanUnusedAfter);
      return Types.CachingResult.HasBeenUpdated
    }
  
  };

  private mergeResponseWithCachedInfo: Types.MergeResponseWithCacheInfo = (response: Response, cacheStatus: Types.CacheStatus | undefined) => {
    return cacheStatus === undefined
      ? response 
      : { ...response, cached: true, expired: cacheStatus === Types.CacheStatus.Expired }
  }

  public async receive(url: RequestInfo, params: Types.RequestInitWithCacheParameters): Promise<Types.ResponseWithCacheInfo | Types.CacheThenNetworkRequestStrategyResult | undefined> {
    const { 
      refreshCacheStrategy,
      requestCacheStrategy,
      ttl,
      cleanUnusedAfter,
      waitForCacheStoring = false,
      ...restParams 
    } = { ...this.defaultParameters, ...params };
    let isFinal = true
    try {
      const { response, cacheStatus } = await ({
        [Types.RequestCacheStrategy.NetworkOnly]: this.networkOnlyRequest,
        [Types.RequestCacheStrategy.CacheOnly]: this.cacheOnlyRequest,
        [Types.RequestCacheStrategy.NetworkFallingBackToCache]: this.networkFallingBackToCacheRequest,
        [Types.RequestCacheStrategy.CacheFallingBackToNetwork]: this.cacheFallingBackToNetworkRequest,
        [Types.RequestCacheStrategy.CacheThenNetwork]: this.cacheThenNetworkRequest,
      }[requestCacheStrategy] || (() => { throw this.createServiceError(Types.SERVICE_ERROR_UNKNOWN_REQUEST_CACHE_STRATEGY) }))(url, restParams);
      
      if (requestCacheStrategy === Types.RequestCacheStrategy.CacheThenNetwork) {
        isFinal = false
        return {
          ...response ? { cached: this.mergeResponseWithCachedInfo(response, cacheStatus) } : {},
          network: this.receive(url, { ...params, requestCacheStrategy: Types.RequestCacheStrategy.NetworkOnly }) as Promise<Types.ResponseWithCacheInfo>
        }
      }

      try {
        // We have not to wait cache update and we don't need the result of caching
        // const cacheResult = await ({
        const cachingPromise = ({
          [Types.RefreshCacheStrategy.NoStore]: () => {},
          [Types.RefreshCacheStrategy.RefreshAlways]: this.refreshAlwaysCaching,
          [Types.RefreshCacheStrategy.RefreshWhenExpired]: this.refreshWhenExpiredCaching,
        }[refreshCacheStrategy] || (() => { throw Types.SERVICE_ERROR_UNKNOWN_REFRESH_CACHE_STRATEGY }))(url, restParams, response, cacheStatus, ttl, cleanUnusedAfter);
        
        if (waitForCacheStoring) {
          await cachingPromise
        }

        return this.mergeResponseWithCachedInfo(response!, cacheStatus);

      } catch (error) {
        throw this.createServiceError(Types.SERVICE_ERROR_CACHING_FAILED)
      }
    } catch (error) {
      if (!(restParams || {}).onError) {
        throw error
      }
    } finally {
      isFinal && (restParams || {}).onFinally && restParams.onFinally!()
    }
  }

}