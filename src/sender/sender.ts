// import { queue as queueTool } from 'asynchronous-tools';

// import Queue from './queue'
import RequestOperand from './request-operand'

interface Deffered {
  func?: Function,
  timer?: any
}

export default class Sender {

  private queue: RequestOperand[] = [] // new Queue()

  private connected = true
  private idle = true
  private process = false

  private request: any
  private storage: any

  private deffered: Deffered = {}
  
  constructor ({ request, storage }) {
    this.storage = storage
    this.request = //request || 
    ((ok = true) => new Promise((resolve, reject) => setTimeout(() => ok ? resolve('OK') : reject('bad...'), 2000)))
  }

  // должна вызываться из приложения, когда сторадж будет готов, и произойдет инициализация пользователя. может быть вызван повторно при смене пользователя
  // повесить декоратор инициализации, т.к. нельзя вызывать какие-то публичные методы предварительно не загрузив старые неотправленные данные
  // TODO:
  // Придумать как хранить в сторадже запросы, эффективнее будет каждый запрос отдельным ключем с префиксом, реализовать паттерн репозиторий для этого
  public restoreRequestsFromStorage = () => {
    // 1. почистить queue - зареджектить висящие промисы
    // 2. залить в queue данные из сторджа
    // 3. стартануть runner
    // this.storage
  }


  // TO CALL FROM UI
  public send = (url, params) => {

    const ro = new RequestOperand(url, params)
    this.queue.push(ro);


    if (!this.connected && !this.idle) {
      ro.rejectWithNetworkError()
    }
    // попытка запуска обработки первого запроса в очереди
    // this.launch()
    this.runner()
    return ro.primaryPromise
      // .catch(error => {
      //   if (error.error == 'network error') {
      //     this.queue.rejectAll()
      //     return error.promise
      //   } else {
      //     // "хорошая" ошибка безнес логики
      //     throw error
      //   }
      // })
  }

  private runner = async (auto = false) => {
    //if (this.process) {
    //  
    //} else {
      debugger;
    
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

    return new Promise(async resolve => {

      const make = async (debugURL = url) => {
        this.process = true
        debugger;
        try {
          const response = await this.request(debugURL, params)
          this.throwIfNetworkError(response)
          this.connected = true
          requestOperand.resolve(response)
          // this.removeDeffered()
          debugger;
          resolve(response)
          await this.storage.delete(key)
        } catch (error) {
          
          await this.storage.set(key, requestOperand.data)
          
          this.connected = false

          console.log(error)
          debugger;
          this.rejectAll()
          this.createDeffered(() => make(debugURL + 1))
          this.process = false
        } 
      }

      return make()
    })
  }

  private throwIfNetworkError = (response) => {}

  private rejectAll = () => this.queue.forEach(ro => ro.rejectWithNetworkError())

  private createDeffered = (func: Function) => {
    if (this.deffered && this.deffered.timer) {
      clearTimeout(this.deffered.timer)
      console.error('Overwrite old deferred!')
    }
    this.deffered = { func, timer: setTimeout(this.runDeffered, 10000) }
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





