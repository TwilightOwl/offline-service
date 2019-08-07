
interface cons {
    a: number
}

class A {
    private a = 0;
    constructor({ a }: cons) {
        this.a = a;
    }
}

const a = new A({ a: 3 });

export default A;

/*
class Storage {

    storage: any = {}

    add = async (hash: string, data: any, ttl = 10000) => {
        this.storage[hash] = { hash, data, until: Date.now() + ttl }
        localStorage.setItem(hash, JSON.stringify({ hash, data, until: Date.now() + ttl }));
    }
    retrieve = async (hash: string) => {

        // const node = this.storage[hash];
        // return node && node.until > Date.now();
        const node = localStorage.getItem(hash);
        if (node === null) {
            return { exist: false }
        } else {
            const parsed = JSON.parse(node);
            return { 
                exist: true, 
                expired: parsed.until < Date.now(), 
                data: parsed.data 
            };
        }
    }

    // retrieve = async (hash: string) => await this.check(hash) ? this.storage[hash].data : undefined;
    // retrieve = async (hash: string) => {
    //     const { exist, expired, data } = await this.check(hash);
        
    //     JSON.parse(localStorage.getItem(hash) as string).data : undefined
    // };
    
}


export default new Storage();
*/