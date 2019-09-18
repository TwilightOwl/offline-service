import { aiWithAsyncInit, aiMethod, aiInit } from 'asynchronous-tools';

import Storage from '../storage'
import RequestOperand from './request-operand'
import { SenderStorageItem, HttpRequest, SenderEndpoint, SenderRequestInit, Serializer } from '../types';

interface Deffered {
  func?: Function,
  timer?: any
}

interface Constructor {
  request: HttpRequest,
  storage: Storage,
  serializer: Serializer,
  requestTimeout: number
}

@aiWithAsyncInit
export default class Sender {

  private queue: RequestOperand[] = []

  private connected = true
  private idle = true
  private process = false

  private request: any
  private storage: any
  private serializer: Serializer
  private requestTimeout: number

  private deffered: Deffered = {}
  
  constructor ({ request, storage, serializer, requestTimeout = 30000 }: Constructor) {
    this.storage = storage
    this.serializer = serializer
    this.request = request
      // ((ok = true) => new Promise((resolve, reject) => setTimeout(() => !ok ? resolve('OK') : reject('bad...'), 2000)))
    this.requestTimeout = requestTimeout
  }

  // должна вызываться из приложения, когда сторадж будет готов, и произойдет инициализация пользователя. может быть вызван повторно при смене пользователя
  // повесить декоратор инициализации, т.к. нельзя вызывать какие-то публичные методы предварительно не загрузив старые неотправленные данные
  @aiInit
  public async restoreRequestsFromStorage() {
    const requests = (await this.storage.getRequests()) as SenderStorageItem[]
    requests.forEach(({ id, data: { url, params } }) => {
      const ro = new RequestOperand(url, params, id)
      this.queue.push(ro)
    })
    this.runner()
    console.log('Sender init')
  }

  @aiMethod
  public finalize() {
    this.queue.forEach(ro => ro.reject('Finalization'))
  }

  @aiMethod
  public async send(url: SenderEndpoint, params: SenderRequestInit) {

    const ro = new RequestOperand(url, params)    
    this.queue.push(ro);

    if (!this.idle) {
      const requestID = await this.storage.addRequest(ro.data)
      ro.id = requestID
      if (!this.connected) {
        ro.rejectWithNetworkError()
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
        if (this.process) {
          console.log('Nothing')
        } else {
          console.log('runDeffered')
          this.runDeffered()
        }
      }
    } else {
      this.idle = true
      this.process = false
    }
  }

  private task = async (requestOperand: RequestOperand) => {
    const { url, params } = requestOperand.data
    const key = 'TODO get key from url or params'
    let requestID = requestOperand.id
    console.log('task', requestOperand)

    return new Promise(async resolve => {

      const make = async (debugURL = url) => {
        this.process = true
        try {
          const response = await this.request(debugURL, params)
          this.throwIfNetworkError(response)
          this.connected = true
          const result = {
            //response: {
              ...response,
              serialized: await this.serializer(response)
            //}
          }
          requestOperand.resolve(result)
          resolve(result)
          requestID && await this.storage.deleteRequest(requestID)
        } catch (error) {
          if (requestID === undefined) {
            requestID = await this.storage.addRequest(requestOperand.data)
          }
          this.connected = false
          console.log(error)
          this.rejectAll()
          // this.createDeffered(() => make(debugURL - 1))
          this.createDeffered(() => make(debugURL))
          this.process = false
        } 
      }

      return make()
    })
  }

  private throwIfNetworkError = (response: Response) => {}

  private rejectAll = () => this.queue.forEach(ro => ro.rejectWithNetworkError())

  private createDeffered = (func: Function) => {
    if (this.deffered && this.deffered.timer) {
      clearTimeout(this.deffered.timer)
      console.error('Overwrite old deferred!')
    }
    this.deffered = { func, timer: setTimeout(this.runDeffered, this.requestTimeout) }
  }

  private runDeffered = () => {
    if (this.deffered && this.deffered.func) {
      clearTimeout(this.deffered.timer)
      const func = this.deffered.func
      this.deffered = {}
      func()
    } else {
      console.error('Run unexisted deferred!')
    }
  }

}