import { StorageAccessors } from "../types";

interface State {
  [k: string]: string
}

class MockStorage {

  public state: State = {}

  public clear = () => this.state = {}
  
  public accessors: StorageAccessors = {
    set: async (key, data) => (this.state[key] = JSON.stringify(data), true),
    get: async key => {
      const item = this.state[key] === undefined ? null : this.state[key];
      return item === null ? item : JSON.parse(item);
    },
    multiGet: async keys => {
      return Promise.all(keys.map(key => {
        const item = this.state[key] === undefined ? null : this.state[key];
        return item === null ? item : JSON.parse(item);
      }))
    },
    remove: async key => {
      delete this.state[key]
      return true;
    },
    multiRemove: async keys => {
      keys.forEach(key => { delete this.state[key] })
      return true;
    },
    getAllKeys: async () => Object.keys(this.state)
  }
}

export default MockStorage;