import { aiWithAsyncInit, aiMethod, aiInit } from 'asynchronous-tools';

import Storage from '../storage'
import RequestOperand from './request-operand'
import { decoder, getDecodedIDs } from './encoder';
import * as Types from '../types';

interface Deferred {
  func?: Function,
  timer?: any
}

interface Constructor {
  request: Types.HttpRequest,
  storage: Storage,
  requestHandler: Types.RequestHandler,
  createError: Types.CreateError,
  defaultParameters: Types.SenderRequestInit
}

@aiWithAsyncInit
export default class Sender {

  private queue: RequestOperand[] = []
  private connected = true
  private idle = true
  private process = false

  private request: any
  private storage: any
  private requestHandler: Types.RequestHandler
  private createError: Types.CreateError
  private defaultParameters: Types.SenderRequestInit

  private deferred: Deferred = {}
  
  constructor ({ request, storage, requestHandler, createError, defaultParameters }: Constructor) {
    this.storage = storage
    this.request = request
    this.requestHandler = requestHandler
    this.createError = createError
    this.defaultParameters = defaultParameters
  }

  private createServiceError = (message: string) => this.createError({ 
    name: Types.SERVICE_ERROR,
    message,
    status: Types.SERVICE_ERROR_STATUS
  })

  // должна вызываться из приложения, когда сторадж будет готов, и произойдет инициализация пользователя. 
  // может быть вызван повторно при смене пользователя повесить декоратор инициализации, т.к. нельзя вызывать 
  // какие-то публичные методы предварительно не загрузив старые неотправленные данные
  @aiInit
  public async restoreRequestsFromStorage() {
    const requests = (await this.storage.getRequests()) as Types.SenderStorageItem[]
    requests.forEach(({ id, data: { url, params, uid } }) => {
      const ro = new RequestOperand(
        url, 
        {
          ...params,
          // this empty handler to omit unhandled promise rejection. It's empty because there are no original caller's (it was on previous app session)
          onError: () => {},
          onFinally: (uid: string) => this.storage.removeFromUsedResponseRegistry(uid)
        },
        id, 
        uid
      );
      this.queue.push(ro);
    })
    this.rejectAll()
    this.runner()
    console.log('Sender init')
  }

  @aiMethod
  public finalize() {
    this.queue.forEach(ro => ro.reject('Finalization'))
  }

  @aiMethod
  public async send(url: Types.SenderEndpoint, params: Types.SenderRequestInit) {

    const {
      requestTimeout, 
      onSuccess,
      onLoading,
      onError,
      onFinally,
      ...restParams 
    } = params || {};

    const ro = new RequestOperand(url, {
      ...params,
      onFinally: (uid: string) => {
        this.storage.removeFromUsedResponseRegistry(uid)
        onFinally && onFinally();
      }
    })
    this.queue.push(ro);

    const requesterUID = ro.data.uid;
    const usedUIDs = getDecodedIDs(url, restParams) as Types.UID[];

    if (usedUIDs && usedUIDs.length) {
      this.storage.addToUsedResponseRegistry(requesterUID, usedUIDs)
    }

    if (!this.idle) {
      const requestID = await this.storage.addRequest(ro.data)
      ro.id = requestID
      if (!this.connected) {
        ro.rejectWithNetworkError(this.createError)
      }
    }

    this.runner()
    return ro.primaryPromise
  }

  private runner = async (auto = false) => {    
    if (this.queue.length) {
      if (this.idle || auto) {
        this.idle = false
        await this.task(this.queue[0])
        this.queue.shift()
        setTimeout(() => this.runner(true), 0)
      } else {
        if (!this.process) {
          this.runDeferred()
        }
      }
    } else {
      this.idle = true
      this.process = false
    }
  }

  private task = async (requestOperand: RequestOperand) => {
    const { url, params, uid } = requestOperand.data
    const { 
      requestTimeout, 
      onSuccess,
      onLoading,
      onError,
      onFinally,
      ...restParams 
    } = { ...this.defaultParameters, ...params }

    return new Promise(async resolve => {

      const make = async () => {
        this.process = true
        try {
          let result, error
          try {
            const resolvedResponses = await this.storage.getResolvedResponses(uid);
            let decoded
            try {
              decoded = (resolvedResponses || []).reduce(({ url, restParams }, { uid, result, error }) => ({
                url: decoder(uid, result)(url),
                restParams: decoder(uid, result)(restParams)
              }), { url, restParams });
            } catch (error) {
              throw this.createServiceError(error)
            }

            result = await this.requestHandler({
              throwNetworkError: () => { throw Types.NETWORK_ERROR }, 
              requestPromise: this.request(decoded.url, decoded.restParams)
            })
          } catch (e) {
            if (e === Types.NETWORK_ERROR) {
              throw e
            } else {
              error = e
            }
          }
          
          this.connected = true
          // save result only if it was deferred promise. if it's primary promise no one used encoded response
          if (requestOperand.isNetworkError) {
            this.storage.addResolvedResposne({ uid, ...error ? { error } : { result } })
          }
          error ? requestOperand.reject(error) : requestOperand.resolve(result)
          // this is just resolving of inner promise (task)
          resolve()
          requestOperand.id && await this.storage.deleteRequest(requestOperand.id)
        } catch (error) {
          if (requestOperand.id === undefined) {
            requestOperand.id = await this.storage.addRequest(requestOperand.data)
          }
          this.connected = false
          this.rejectAll()
          this.createDeferred(make, requestTimeout)
          this.process = false
        }
      }

      return make()
    })
  }

  private rejectAll = () => this.queue.forEach(ro => ro.rejectWithNetworkError(this.createError))

  private createDeferred = (func: Function, requestTimeout: number) => {
    if (this.deferred && this.deferred.timer) {
      clearTimeout(this.deferred.timer)
      console.error('Overwrite old deferred!')
    }
    this.deferred = { func, timer: setTimeout(this.runDeferred, requestTimeout) }
  }

  private runDeferred = () => {
    if (this.deferred && this.deferred.func) {
      clearTimeout(this.deferred.timer)
      const func = this.deferred.func
      this.deferred = {}
      func()
    }
  }

}