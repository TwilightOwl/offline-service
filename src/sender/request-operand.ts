import { encoder } from './encoder';
import * as Types from '../types';

enum PromiseStatus {
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected'
}

interface PromiseObject {
  promise: Promise<any>,
  resolve: Function,
  reject: Function,
  status: PromiseStatus
}


export default class RequestOperand {

  public data: Types.SenderStorageItemData
  private primary!: PromiseObject
  private secondary?: PromiseObject
  public id?: number
  
  constructor(
    url: Types.SenderEndpoint, 
    params: Omit<Types.SenderRequestInit, 'onFinally'> & { onFinally: (uid: string) => any }, 
    id?: number, 
    uid?: string
  ) {
    this.data = { 
      url, 
      params,
      uid: uid || (Date.now() + '-' + Math.random())
    }
    this.primary = this.createPromise()
    this.id = id
    
    this.launch(Types.LifecycleHandlerNames.onLoading, { loading: true, deferred: false })

    this.primary.promise = this.primary.promise
      .then(data => {
        this.launch(Types.LifecycleHandlerNames.onSuccess, { ...data, deferred: false })
        this.launch(Types.LifecycleHandlerNames.onLoading, { loading: false, deferred: false })
        this.launch(Types.LifecycleHandlerNames.onFinally, this.data.uid)
        return { ...data, deferred: false }
      }).catch(error => {
        this.launch(Types.LifecycleHandlerNames.onLoading, { loading: false, deferred: false })
        const isNetworkError = error.name === Types.NETWORK_ERROR
        if(!this.launch(Types.LifecycleHandlerNames.onError, { ...error, isNetworkError, getFutureResponse: encoder(this.data.uid) })) {
          isNetworkError ? this.launch(Types.LifecycleHandlerNames.onLoading, { loading: true, deferred: true }) : this.launch(Types.LifecycleHandlerNames.onFinally, this.data.uid)
          throw { ...error, isNetworkError }
        } else {
          isNetworkError ? this.launch(Types.LifecycleHandlerNames.onLoading, { loading: true, deferred: true }) : this.launch(Types.LifecycleHandlerNames.onFinally, this.data.uid)
        }
      })
  }

  private launch = (handlerName: Types.LifecycleHandlerNames, arg: any) => {
    if (this.data.params[handlerName]) {
      try {
        this.data.params[handlerName]!(arg)
      } catch (error) {}
      return true
    }
  }
  
  private createPromise = () => {
    let resolve!: Function, reject!: Function, status: PromiseStatus
    return { 
      promise: new Promise((res, rej) => {
        resolve = (...args: any[]) => ( status = status || PromiseStatus.Fulfilled, res(...args) )
        reject = (...args: any[]) => ( status = status || PromiseStatus.Rejected, rej(...args) )
      }),
      resolve,
      reject, 
      get status () { return status || PromiseStatus.Pending } 
    } as PromiseObject
  }

  public get isNetworkError () {
    return this.primary.status === PromiseStatus.Rejected
  }

  public get primaryPromise () {
    return this.primary.promise
  }

  public get resolve () {
    return this.primary.status === PromiseStatus.Rejected ? this.secondary!.resolve : this.primary.resolve
  }

  public get reject () {
    return this.primary.status === PromiseStatus.Rejected ? this.secondary!.reject : this.primary.reject
  }

  public rejectWithNetworkError = (createError: Types.CreateError) => {
    if (this.primary.status === PromiseStatus.Pending) {
      this.secondary = this.createPromise()
      
      this.secondary.promise = this.secondary.promise
        .then(data => {
          this.launch(Types.LifecycleHandlerNames.onSuccess, { ...data, deferred: true })
          this.launch(Types.LifecycleHandlerNames.onLoading, { loading: false, deferred: true })
          this.launch(Types.LifecycleHandlerNames.onFinally, this.data.uid)
          return { ...data, deferred: true }
        }).catch(error => {
          this.launch(Types.LifecycleHandlerNames.onLoading, { loading: false, deferred: true })
          if(!this.launch(Types.LifecycleHandlerNames.onError, { ...error, isNetworkError: false })) {
            this.launch(Types.LifecycleHandlerNames.onFinally, this.data.uid)
            throw { ...error, isNetworkError: false }
          } else {
            this.launch(Types.LifecycleHandlerNames.onFinally, this.data.uid)
          }
        })

      this.primary.reject(
        createError({
          name: Types.NETWORK_ERROR,
          message: Types.NETWORK_ERROR_REQUEST_HAS_FAILED,
          status: Types.NETWORK_ERROR_STATUS,
          promise: this.secondary.promise
        })
      )
    }
  }

}