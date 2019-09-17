import { aiWithAsyncInit, aiMethod, aiInit } from 'asynchronous-tools';

const KEY = '__offline__'
const REGISTRY_KEY = KEY + 'registry'
const SEQUENCE_KEY = KEY + 'sequence'

@aiWithAsyncInit
export default class Storage {

  private sequence = 0
  private registry = []

  constructor(storage) {
    this.storage = storage
    this.init()
  }

  @aiInit
  private async init() {
    const data = await this.storage.get(REGISTRY_KEY)
    this.registry = data ? data : []
    this.sequence = this.registry.length ? this.registry[this.registry.length - 1] : 0
  }

  get newID() {
    return ++this.sequence
  }

  @aiMethod
  public async addRequest(data: any) {
    const id = this.newID
    await this.storage.set(KEY + id, { id, data })
    this.registry.push(id)
    await this.storage.set(REGISTRY_KEY, this.registry)
    return id
  }

  @aiMethod
  public async getRequests() {
    debugger
    const data = await this.storage.multiGet(this.registry.map(id => KEY + id))
    return data
    //const result = this.registry.reduce((acc, id, index) => data[index] ? [ ...acc, { ...data[index], savedID: id } ] : acc, [])
    //return result
  }

  @aiMethod
  public async deleteRequest(id) {
    await this.storage.delete(KEY + id)
    this.registry = this.registry.filter(item => item !== id)
    await this.storage.set(REGISTRY_KEY, this.registry)
  }

}