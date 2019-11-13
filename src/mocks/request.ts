export default (url: RequestInfo, data?: RequestInit): Promise<any> => {
  return new Promise((resolve, reject) => {
      const success = String(url)[0] !== '-';
      setTimeout(() => (success ? resolve : reject)(
        String(url).slice(1)
      ), 0);
  })
}

export const getCacheKey = (url: RequestInfo, params?: RequestInit) => String(url).slice(1);