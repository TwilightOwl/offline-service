import { aiWithAsyncInit, aiMethod, aiInit } from 'asynchronous-tools';

import Storage from './storage'
import Receiver from './receiver'
import Sender from './sender'

import { HttpRequest, StorageAccessors, GetCacheKey, Serializer, RequestInitWithCacheParameters, RequestTypes } from './types'

interface Constructor {
    request: HttpRequest,
    storageAccessors: StorageAccessors,
    getCacheKey: GetCacheKey,
    serializer: Serializer
}

@aiWithAsyncInit
export default class OfflineService {

    private storage: Storage
    private sender: Sender
    private receiver: Receiver

    constructor({ request, storageAccessors, getCacheKey, serializer }: Constructor) {
        const storage = this.storage = new Storage(storageAccessors)
        this.sender = new Sender({ storage, request, serializer, requestTimeout: 1000 });
        this.receiver = new Receiver({ storage, request, getCacheKey, serializer });
    }

    @aiInit
    public init = async () => {
        await this.storage.init()
        await this.sender.restoreRequestsFromStorage()
        await this.receiver.init()
        console.log('Service init')
    }

    @aiMethod
    public request = async (url: RequestInfo, params: RequestInitWithCacheParameters) => {
        const { 
            requestType = RequestTypes.DataReceiveRequest, 
            // requestCacheStrategy = RequestCacheStrategy.CacheFallingBackToNetwork, 
            // refreshCacheStrategy = RefreshCacheStrategy.RefreshAlways,
            ...rest
        } = params;
        debugger
        return requestType === RequestTypes.DataSendRequest ? await this.sender.send(url, rest) : await this.receiver.receive(url, rest)
    }

}