export const request = (url: RequestInfo, data?: RequestInit): Promise<Response> => {
  return new Promise((resolve, reject) => {
      const success = String(url)[0] !== '-';
      setTimeout(() => (success ? resolve : reject)({
          ok: success,
          body: Math.random()
      } as any), 2000);
  })
}

export const storage = {
  set: async (key, data) => (localStorage.setItem(key, JSON.stringify(data)), true),
  get: async (key) => {
    const item = localStorage.getItem(key);
    return item === null ? item : JSON.parse(item);
  },
  delete: async (key) => (localStorage.removeItem(key), true)
}

export const getCacheKey = (url: RequestInfo, params?: RequestInit) => String(url).slice(1)