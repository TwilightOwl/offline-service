import { aiWithAsyncInit, aiMethod, aiInit } from 'asynchronous-tools';
import * as Types from './types';

@aiWithAsyncInit
export default class Storage {

  private sequence = 0
  private registry: number[] = []
  private storage: Types.StorageAccessors

  constructor(storage: Types.StorageAccessors) {
    this.storage = storage
  }
  
  @aiInit
  public async init() {
    const data = (await this.storage.get(Types.REGISTRY_KEY)) as number[]
    this.registry = data ? data : []
    this.sequence = this.registry.length ? this.registry[this.registry.length - 1] : 0
    await this.cleanOutdatedAndUnusedData();
  }
  
  private async cleanOutdatedAndUnusedData() {
    try {
      await this.cleanReceiverData();
    } catch (error) {
      console.error('Offline service: clean receiver data failure')
    } finally {
      try {
        await this.cleanSenderData();
      } catch (error) {
        console.error('Offline service: clean sender data failure')
      }
    }
  }


  // These methods are for recievers (handling cache)

  @aiMethod
  public async addCacheItem(key: string, data: any, ttl = 10000, cleanUnusedAfter = 1000 * 60 * 60 * 24 * 3) {
    return this.storage.set(Types.RECEIVER_RESPONSE_KEY + key, { key, data, until: Date.now() + ttl, used: Date.now(), after: cleanUnusedAfter });
  }

  @aiMethod
  public async getCacheItem(key: string) {
    const cached = await this.storage.get(Types.RECEIVER_RESPONSE_KEY + key);
    if (cached === null) {
      return { exist: false }
    } else {
      await this.storage.set(Types.RECEIVER_RESPONSE_KEY + key, { ...cached, used: Date.now() });
      return { 
        exist: true, 
        expired: cached.until < Date.now(), 
        data: cached.data 
      };
    }
  }

  private async cleanReceiverData() {
    const keys = await this.storage.getAllKeys();
    const cachedKeys = keys.filter(key => {
      return key.substr(0, Types.RECEIVER_RESPONSE_KEY.length) === Types.RECEIVER_RESPONSE_KEY || (
        // for backward compatibility
        key.substr(0, Types.REGISTRY_KEY.length) !== Types.REGISTRY_KEY &&
        key.substr(0, Types.USED_RESPONSES_REGISTRY_KEY.length) !== Types.USED_RESPONSES_REGISTRY_KEY &&
        key.substr(0, Types.SENDER_RESPONSE_KEY.length) !== Types.SENDER_RESPONSE_KEY &&
        key.substr(0, Types.REGISTRY_KEY.length) !== Types.REGISTRY_KEY &&
        !key.substr(Types.KEY.length).match(/^[0-9]*$/)
      )
    });
    const cachedData = await this.storage.multiGet(cachedKeys) as Types.CachedItem[];
    const deadKeys = cachedKeys.filter((key: string, index: number) => (
      (cachedData[index].used || 0) + (cachedData[index].after || 0) < Date.now()
    ));
    await this.storage.multiRemove(deadKeys);
  }


  // These methods are for senders (handling deferred requests)

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
    // someone can clear storage, but registry and sequence store locally here. On next launch there will be null items
    return data.filter(x => x)
  }

  @aiMethod
  public async deleteRequest(id: number) {
    await this.storage.remove(Types.KEY + id)
    this.registry = this.registry.filter(item => item !== id)
    await this.storage.set(Types.REGISTRY_KEY, this.registry)
  }



  // These methods are for senders (handling future responses and who is using them)

  @aiMethod
  public async addResolvedResposne(data: { uid: string, error?: any, result?: any }) {
    const { uid, error, result } = data;
    await this.storage.set(Types.SENDER_RESPONSE_KEY + uid, { uid, error, result })
    return uid
  }

  private async getUsedResponseRegistry() {
    const usedResponseRegistry = (await this.storage.get(Types.USED_RESPONSES_REGISTRY_KEY) || {}) as Types.UsedResponseRegistry;
    return usedResponseRegistry;
  }

  @aiMethod
  private async setUsedResponseRegistry(data: Types.UsedResponseRegistry) {
    await this.storage.set(Types.USED_RESPONSES_REGISTRY_KEY, data);
  }

  @aiMethod
  public async addToUsedResponseRegistry(requesterUID: Types.UID, usedUIDs: Types.UID[]) {
    const usedResponseRegistry = await this.getUsedResponseRegistry();
    usedResponseRegistry[requesterUID] = usedUIDs;
    return this.setUsedResponseRegistry(usedResponseRegistry);
  }

  @aiMethod
  public async removeFromUsedResponseRegistry(requesterUID: Types.UID) {
    const usedResponseRegistry = await this.getUsedResponseRegistry();
    delete usedResponseRegistry[requesterUID];
    return this.setUsedResponseRegistry(usedResponseRegistry);
  }

  @aiMethod
  public async getResolvedResponses(uid: string): Promise<Types.ResolvedResponses[]> {
    const usedResponseRegistry = await this.getUsedResponseRegistry();
    const usedResponseUIDs = usedResponseRegistry[uid] || [];
    const result = await Promise.all(usedResponseUIDs
      .map(usedUID => this.storage.get(Types.SENDER_RESPONSE_KEY + usedUID) as Promise<Types.ResolvedResponses>));
    return result;
  }

  private async cleanSenderData() {
    const usedResponseRegistry = await this.getUsedResponseRegistry();
    const used = Object.keys(usedResponseRegistry)
      .reduce((acc, key) => [ ...acc, key, ...(usedResponseRegistry[key] || []) ], [] as string[]);
    const keys = await this.storage.getAllKeys();
    const unusedKeys = keys.filter(key => {
      return key.substr(0, Types.SENDER_RESPONSE_KEY.length) === Types.SENDER_RESPONSE_KEY
        && !used.includes(key.substr(Types.SENDER_RESPONSE_KEY.length))
    });
    await this.storage.multiRemove(unusedKeys);
  }

}