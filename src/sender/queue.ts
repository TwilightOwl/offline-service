import RequestOperand from './request-operand'

export default class Queue {

  private queue = []
  // private connected = true
  // private empty = true
  // private process = false

  // private launch = () => {
  //   if (!this.queue.length) return
  //   const item = this.queue[0]
  //   this.process = true

  // }

  // SYNC!!!
  public add = (url, params) => {
    const ro = new RequestOperand(url, params)
    
    this.queue.push(ro);
    return ro
  }

  // private reject = item => {
  //   item.primary.reject({ 
  //     error: 'Network error',
  //     promise: item.secondary.promise
  //   })
  // }

  public rejectAll = () => this.queue.forEach(ro => ro.rejectWithNetworkError())

}