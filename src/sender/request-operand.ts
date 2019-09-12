enum PromiseStatus {
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected'
}

const NETWORK_ERROR = 'network error'

export default class RequestOperand {

  private data = {}
  private primary!
  private secondary: any

  constructor(url, params) {
    this.data = { url, params }
    this.primary = this.createPromise()
  }
  
  private createPromise = () => {
    let resolve, reject, status: string
    return { 
      promise: new Promise((res, rej) => {
        resolve = (...args: any[]) => ( status = status || PromiseStatus.Fulfilled, res(...args) )
        reject = (...args: any[]) => ( status = status || PromiseStatus.Rejected, rej(...args) )
      }),
      resolve, 
      reject, 
      get status () { return status || PromiseStatus.Pending } 
    }
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
    return this.secondary.resolve
  }

  public get resolve () {
    return this.primary.status === PromiseStatus.Rejected ? this.secondary.resolve : this.primary.resolve
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