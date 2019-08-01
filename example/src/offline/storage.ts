class Storage {

    storage: any = {}

    add = async (hash: string, data: any, ttl = 10000) => {
        this.storage[hash] = { hash, data, until: Date.now() + ttl }
    }

    check = async (hash: string) => {
        const node = this.storage[hash];
        return node && node.until > Date.now();
    }

    retrieve = async (hash: string) => await this.check(hash) ? this.storage[hash].data : undefined;
    
}


export default new Storage();