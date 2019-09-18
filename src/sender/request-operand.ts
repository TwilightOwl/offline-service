import { SenderEndpoint, SenderRequestInit } from "../types"

enum PromiseStatus {
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected'
}

const NETWORK_ERROR = 'network error'

interface Data {
  url: SenderEndpoint,
  params: SenderRequestInit
}

interface PromiseObject {
  promise: Promise<any>,
  resolve: Function,
  reject: Function,
  status: PromiseStatus
}

export default class RequestOperand {

  public data: Data
  private primary!: PromiseObject
  private secondary?: PromiseObject
  public id?: number

  constructor(url: SenderEndpoint, params: SenderRequestInit, id?: number) {
    this.data = { url, params }
    this.primary = this.createPromise()
    this.id = id
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

  public get resolvePrimary () {
    return this.primary.resolve
  }

  public get resolveSecondary () {
    return this.secondary && this.secondary.resolve
  }

  public get resolve () {
    return this.primary.status === PromiseStatus.Rejected ? this.secondary!.resolve : this.primary.resolve
  }

  public get reject () {
    return this.primary.status === PromiseStatus.Rejected ? this.secondary!.reject : this.primary.reject
  }

  public rejectWithNetworkError = () => {
    if (this.primary.status === PromiseStatus.Pending) {
      this.secondary = this.createPromise()
      this.primary.reject({
        error: 'network error',
        promise: this.secondary.promise
      })
    }
  }

}