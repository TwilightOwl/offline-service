import { aiWithAsyncInit, aiMethod, aiInit } from 'asynchronous-tools';
import Storage, { IStorage } from './storage'
import Receiver from './receiver'
import Sender from './sender'
import * as Types from './types'

interface Constructor {
  request: Types.HttpRequest,
  storageAccessors: Types.StorageAccessors,
  getCacheKey: Types.GetCacheKey,
  requestHandler: Types.RequestHandler,
  createError: Types.CreateError,
  defaultParameters?: Types.DefaultParameters
}

@aiWithAsyncInit
export default class OfflineService {

  private storage: IStorage
  private sender: Sender
  private receiver: Receiver

  constructor({ request, storageAccessors, getCacheKey, defaultParameters, requestHandler, createError }: Constructor) {
    const storage = this.storage = new Storage(storageAccessors)
    const { requestTimeout = 10000 } = (defaultParameters || {}).send || {}
    const { 
      refreshCacheStrategy = Types.RefreshCacheStrategy.RefreshAlways, 
      requestCacheStrategy = Types.RequestCacheStrategy.CacheFallingBackToNetwork, 
      ttl = 10000,
      cleanUnusedAfter = 1000 * 60 * 60 * 24 * 3
    } = (defaultParameters || {}).receive || {}

    this.sender = new Sender({ storage, request, requestHandler, createError,
      defaultParameters: { requestTimeout }
    });
    this.receiver = new Receiver({ storage, request, getCacheKey, requestHandler, createError,
      defaultParameters: { refreshCacheStrategy, requestCacheStrategy, ttl, cleanUnusedAfter }
    });
  }

  @aiInit
  public async init() {
    await this.storage.init()
    await this.sender.restoreRequestsFromStorage()
    await this.receiver.init()
  }

  public async finalize() {
    await this.sender.finalize()
  }

  @aiMethod
  public async request(url: RequestInfo, params: Types.RequestInitWithCacheParameters | Types.SenderRequestInit) {
    const { requestType = Types.RequestTypes.DataReceiveRequest, ...rest } = params;
    return requestType === Types.RequestTypes.DataSendRequest 
      ? await this.sender.send(url, rest as Types.SenderRequestInit) 
      : await this.receiver.receive(url, rest as Types.RequestInitWithCacheParameters)
  }
}