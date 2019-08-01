import request from './http';

import storage from './storage';

const getHash = (url: string, data: any) => url;

export const receive = async (url: string, data: any) => {
    const hash = getHash(url, data);
    const cached = await storage.retrieve(hash);
    if (cached === undefined) {
        const result = await request(url, data);
        // unblocking promise
        storage.add(hash, result);
        return result;
    } else {
        return cached
    }
}

