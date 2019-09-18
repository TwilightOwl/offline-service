import { aiWithAsyncInit, aiMethod, aiInit } from 'asynchronous-tools';
// import { StorageAccessors, REGISTRY_KEY, KEY } from './types';
import * as Types from './types';

@aiWithAsyncInit
export default class Storage {

  private sequence = 0
  private registry: number[] = []
  private storage: Types.StorageAccessors

  constructor(storage: Types.StorageAccessors) {
    this.storage = storage
    // this.init()
  }

  //добавить сюда метода для кэша
  //вынести кэш в отдельный модуль
  //в этот модуль прокинуть сторадж

  @aiInit
  public async init() {
    const data = (await this.storage.get(Types.REGISTRY_KEY)) as number[]
    this.registry = data ? data : []
    this.sequence = this.registry.length ? this.registry[this.registry.length - 1] : 0
    //console.log('Storage init')
  }

  @aiMethod
  public async addCacheItem(key: string, data: any, ttl = 10000) {
    return this.storage.set(Types.KEY + key, { key, data, until: Date.now() + ttl });
  }

  @aiMethod
  public async getCacheItem(key: string) {
    const cached = await this.storage.get(Types.KEY + key);
    if (cached === null) {
      return { exist: false }
    } else {
      return { 
        exist: true, 
        expired: cached.until < Date.now(), 
        data: cached.data 
      };
    }
  }

  get newID() {
    return ++this.sequence
  }

  @aiMethod
  public async addRequest(data: any) {
    const id = this.newID
    await this.storage.set(Types.KEY + id, { id, data })
    this.registry.push(id)
    await this.storage.set(Types.REGISTRY_KEY, this.registry)
    return id
  }

  @aiMethod
  public async getRequests() {
    const data = await this.storage.multiGet(this.registry.map(id => Types.KEY + id))
    return data
  }

  @aiMethod
  public async deleteRequest(id: number) {
    await this.storage.delete(Types.KEY + id)
    this.registry = this.registry.filter(item => item !== id)
    await this.storage.set(Types.REGISTRY_KEY, this.registry)
  }

}