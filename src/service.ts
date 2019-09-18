import { aiWithAsyncInit, aiMethod, aiInit } from 'asynchronous-tools';

import Storage from './storage'
import Receiver from './receiver'
import Sender from './sender'

import * as Types from './types'
import { HttpRequest } from './types'

interface Constructor {
    request: Types.HttpRequest,
    storageAccessors: Types.StorageAccessors,
    getCacheKey: Types.GetCacheKey,
    serializer: Types.Serializer,
    requestTimeout: number
}

@aiWithAsyncInit
export default class OfflineService {

    private storage: Storage
    private sender: Sender
    private receiver: Receiver

    constructor({ request, storageAccessors, getCacheKey, serializer, requestTimeout = 1000 }: Constructor) {
        const storage = this.storage = new Storage(storageAccessors)
        this.sender = new Sender({ storage, request, serializer, requestTimeout });
        this.receiver = new Receiver({ storage, request, getCacheKey, serializer });
    }

    @aiInit
    public async init() {
        await this.storage.init()
        await this.sender.restoreRequestsFromStorage()
        await this.receiver.init()
        //console.log('Service init')
    }

    @aiMethod
    public async request(url: RequestInfo, params: Types.RequestInitWithCacheParameters) {
        const { 
            requestType = Types.RequestTypes.DataReceiveRequest, 
            // requestCacheStrategy = RequestCacheStrategy.CacheFallingBackToNetwork, 
            // refreshCacheStrategy = RefreshCacheStrategy.RefreshAlways,
            ...rest
        } = params;
        return requestType === Types.RequestTypes.DataSendRequest ? await this.sender.send(url, rest) : await this.receiver.receive(url, rest)
    }

}