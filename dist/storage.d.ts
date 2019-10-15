import * as Types from './types';
export default class Storage {
    private sequence;
    private registry;
    private storage;
    constructor(storage: Types.StorageAccessors);
    init(): Promise<void>;
    private cleanOutdatedAndUnusedData;
    addCacheItem(key: string, data: any, ttl?: number): Promise<boolean>;
    getCacheItem(key: string): Promise<{
        exist: boolean;
        expired?: undefined;
        data?: undefined;
    } | {
        exist: boolean;
        expired: boolean;
        data: any;
    }>;
    private cleanReceiverData;
    readonly newID: number;
    addRequest(data: any): Promise<number>;
    getRequests(): Promise<(Types.CachedItem | Types.SenderStorageItem | null)[]>;
    deleteRequest(id: number): Promise<void>;
    addResolvedResposne(data: {
        uid: string;
        error?: any;
        result?: any;
    }): Promise<string>;
    private getUsedResponseRegistry;
    private setUsedResponseRegistry;
    addToUsedResponseRegistry(requesterUID: Types.UID, usedUIDs: Types.UID[]): Promise<void>;
    removeFromUsedResponseRegistry(requesterUID: Types.UID): Promise<void>;
    getResolvedResponses(uid: string): Promise<Types.ResolvedResponses[]>;
    private cleanSenderData;
}
