// import { queue as queueTool } from 'asynchronous-tools';

import Queue from './queue'

export default class Sender {

  private queue = new Queue()

  private connected = true
  private idle = true
  private process = false
  
  constructor ({ request }) {
    this.request = request || ((ok = true) => new Promsie((resolve, reject) => setTimeout(ok ? resolve : reject, 1000)))
  }

  // private taskQueue = queueTool('Task queue', { 
  //   onIsQueueProcessing: (isProcessing: boolean) => {},
  //   // onRejection: OnRejection.RejectAlways
  // })

  /*
    таск - промис, который может только резолвиться. делает следующее:
      - таск завязан на конкретный элемент очереди промисов this.queue
      - пытается сделать запрос, запрос успешен
        ? 
          - резолвится промис из req: если запрос делался первый раз (т.е. промис A в req не зарезолвен) то резолвится A, если уже 
            был фэйл с сетью и в ожидании промис B, то резолвим его.
          - резолвим таск. дальше засчет обертки this.taskQueue запустится следующий таск
        : 
          - реджектим промис A у всех req в this.queue (можно не реджектить если уже реджектнутый), таким образом ui узнает от всех своих текущих запросов,
            что проблемы с сетью
          - запускаем по таймауту вторую попытку отправки, таск попрежнему не зарезолвлен, все остальные таски продолжают ждать в очереди


  */

  // private task = this.taskQueue(async () => {})


  // TO CALL FROM UI
  public send = (url, params) => {
    const ro = this.queue.add(url, params)
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

                /*

                // версия по аналогии с queue из async-tools
                private doNext = async () => {
                  const ro = this.queue[0]
                  try {
                    const response = await this.request(ro.data.url, ro.data.params)
                    throwIfNetworkError(response)
                    ro.resolve(response)
                    this.queue.shift()
                    this.doNext()
                    // resolve(response)
                  } catch (error) {
                    this._____runDeffered(ro)
                    throw 'TODO отложенный запуск запроса'
                  }

                }

                private _____runDeffered = (...args) => {
                  this.deffered = setTimeout(() => {
                    this.doNext(...args)
                  }, 5000)
                }

                private launch = () => {
                  // if (!this.queue.length) return
                  if (this.process) return
                  this.removeDefferedTask()
                  
                  const item = this.queue[0]

                  this.process = true
                }
                */

  /////////////////////

  private runner = async () => {
    //if (this.process) {
    //  
    //} else {
    
      if (this.queue.length) {
        if (this.idle) {
          this.idle = false
          await this.task(this.queue[0])
          this.queue.shift()
          setTimeout(this.runner, 0)
        } else {
          if (this.process) {
            //
          } else {
            this.runDeffered()
          }
        }
      } else {
        this.idle = true
        this.process = false
      }

  }

  private task = async (requestOperand) => {
    const { url, params } = requestOperand

    return new Promise(async resolve => {

      const make = async () => {
        this.process = true
        try {
          const response = await this.request(url, params)
          throwIfNetworkError(response)

          // this.removeDeffered()

          resolve(response)
        } catch (error) {
          this.createDeffered(make)
          this.process = false
        } 
      }

      return make()
    })
  }

  private createDeffered = (func) => {
    if (this.deffered && this.deffered.timer) {
      clearTimeout(this.deffered.timer)
      console.error('Overwrite old deferred!')
    }
    this.deffered = { func, timer: setTimeout(this.runDeffered, 5000) }
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


  public BAD____sendRequest = async (req) => {

    if (this.idle) {
      if (this.connected) {
        const task = this.queue.add(req)
        this.launch()
        return task.primary.promise
          .then(result => result)
          .catch(error => {
            if (error.networkError) {
              this.queue.rejectAll()
              return task.secondary.promise
            } else {
              // "хорошая" ошибка безнес логики
              throw error
            }
          })
        await ;
        if (result) {
          return result
        } else {
          var promise = new Promise(r => r);
          await queue.resolveAllWithNetworkError();
          return { result: 'network error', promise }
        }
      } else {
        queue.add(req)
      }
    } else {

    }

  }

}





