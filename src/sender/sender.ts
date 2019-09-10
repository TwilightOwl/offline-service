// import { queue as queueTool } from 'asynchronous-tools';

import Queue from './queue'

export default class Sender {

  private queue = new Queue()

  private connected = true
  private empty = true
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

  private task = async (requestOperand) => {
    return new Promise(async resolve => {
      try {
        const response = await this.request()
        throwIfNetworkError(response)
        resolve(response)
      } catch (error) {
        this.runDeffered
        throw 'TODO отложенный запуск запроса'
      }
    })
  }

  public send = (url, params) => {
    const ro = this.queue.add(url, params)
    if (!this.connected && !this.empty) {
      ro.rejectWithNetworkError()
    }
    // попытка запуска обработки первого запроса в очереди
    this.launch()
    return ro.primaryPromise
  }

  private launch = () => {
    // if (!this.queue.length) return
    if (this.process) return
    this.removeDefferedTask()
    
    const item = this.queue[0]



    this.process = true
  }

  public sendRequest = async (req) => {

    if (this.empty) {
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





