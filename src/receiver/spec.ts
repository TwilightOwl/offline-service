import Receiver from '.';
import { Storage as MockStorage, request, getCacheKey } from '../mocks';
import Storage from '../storage';
import { RefreshCacheStrategy, RequestCacheStrategy, RequestHandler, CreateError, NETWORK_ERROR, RECEIVER_RESPONSE_KEY, SERVICE_ERROR, SERVICE_ERROR_STATUS, SERVICE_ERROR_CACHE_RETRIEVING_FAILED, SERVICE_ERROR_NETWORK_THEN_CACHE_RETRIEVING_FAILED, SERVICE_ERROR_CACHE_THEN_NETWORK_RETRIEVING_FAILED, NETWORK_ERROR_REQUEST_HAS_FAILED, NETWORK_ERROR_STATUS } from '../types';

const pause = (timeout = 200) => new Promise(resolve => setTimeout(resolve, timeout))

const mockStorage = new MockStorage();
const storage = new Storage(mockStorage.accessors)

const createError: CreateError = ({ status, name, message, ...rest }) => ({
  fakeName: name, fakeStatus: status, fakeBody: message, ...rest
})

const requestHandler: RequestHandler = async ({ throwNetworkError, requestPromise }) => {
  let response
  try {
    response = await requestPromise
  } catch (error) {
    throwNetworkError()
    return
  } 
  return response
}

const refreshCacheStrategy = RefreshCacheStrategy.NoStore;
const requestCacheStrategy = RequestCacheStrategy.NetworkOnly;
const ttl = 10000;
const cleanUnusedAfter = 1000 * 60 * 60 * 24 * 3;

const receiver = new Receiver({ storage, request, getCacheKey, requestHandler, createError,
  defaultParameters: { refreshCacheStrategy, requestCacheStrategy, ttl, cleanUnusedAfter, waitForCacheStoring: true }
});

it('Initialization', async () => {
  await receiver.init();
  await storage.init();
})

describe('NetworkOnly NoStore', () => {

  it('Success request', async () => {
    try {
      //@ts-ignore
      const result = await receiver.receive('+X');
      expect(result).toEqual('X')
    } catch (error) {
      throw error
    }
  })

  it('Failure request', async () => {
    try {
      //@ts-ignore
      const result = await receiver.receive('-X');
    } catch (error) {
      expect(error).toEqual(NETWORK_ERROR)
    }
  })

  it('Storage doesn\'t consist any data', () => {
    expect(mockStorage.state).toEqual({})
  })

})

describe('NetworkOnly RefreshAlways', () => {
  it('Failure request', async () => {
    try {
      //@ts-ignore
      const result = await receiver.receive('-Y', { refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways });
    } catch (error) {
      expect(error).toEqual(NETWORK_ERROR)
    }
  })

  it('Success request', async () => {
    try {
      mockStorage.clear();
      //@ts-ignore
      const result = await receiver.receive('+X', { refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways });
      expect(result).toEqual('X');
      const key = `${RECEIVER_RESPONSE_KEY}X`;
      expect(mockStorage.state).toHaveProperty(key);
      // Тест не должен завязываться на внутреннюю структуру хранения данных, достаточно проверить что запрос попал в кэш, будут отдельные тесты на то как обновляется кэш
      // expect(mockStorage.state[key]).toHaveProperty('key');
      // expect(mockStorage.state[key]).toHaveProperty('data');
      // expect(mockStorage.state[key]).toHaveProperty('until');
      mockStorage.clear();
    } catch (error) {
      throw error
    }
  })

  it('Success request - check cache updating', async () => {
    try {
      mockStorage.clear();
      const key = `${RECEIVER_RESPONSE_KEY}X`;
      //@ts-ignore
      await receiver.receive('+X', { refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways });
      expect(mockStorage.state).toHaveProperty(key);
      const before = mockStorage.state[key];
      //@ts-ignore
      await receiver.receive('+X', { refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways });
      expect(mockStorage.state).toHaveProperty(key);
      expect(before).not.toEqual(mockStorage.state[key]);
      //@ts-ignore
      await receiver.receive('+Z', { refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways });
      const keyZ = `${RECEIVER_RESPONSE_KEY}Z`;
      expect(mockStorage.state).toHaveProperty(key);
      expect(mockStorage.state).toHaveProperty(keyZ);
      expect(mockStorage.state[key]).not.toEqual(mockStorage.state[keyZ]);
      mockStorage.clear();
    } catch (error) {
      throw error
    }
  })
})

describe('NetworkOnly RefreshWhenExpired', () => {
  it('Failure request', async () => {
    try {
      //@ts-ignore
      const result = await receiver.receive('-Y', { refreshCacheStrategy: RefreshCacheStrategy.RefreshWhenExpired });
    } catch (error) {
      expect(error).toEqual(NETWORK_ERROR)
    }
  })

  it('Success request - refresh after expiration only', async () => {
    try {
      mockStorage.clear();
      const key = `${RECEIVER_RESPONSE_KEY}X`;
      //@ts-ignore
      await receiver.receive('+X', { refreshCacheStrategy: RefreshCacheStrategy.RefreshWhenExpired, ttl: 100 });
      const before = JSON.parse(mockStorage.state[key]);
      //@ts-ignore
      await receiver.receive('+X', { refreshCacheStrategy: RefreshCacheStrategy.RefreshWhenExpired, ttl: 10000000 });
      expect(before.until).toEqual(JSON.parse(mockStorage.state[key]).until);

      await pause(150);

      //@ts-ignore
      await receiver.receive('+X', { refreshCacheStrategy: RefreshCacheStrategy.RefreshWhenExpired });
      expect(before.until).not.toEqual(JSON.parse(mockStorage.state[key]).until);
      mockStorage.clear();
    } catch (error) {
      throw error
    }
  })
})

describe('CacheOnly RefreshAlways', () => {
  it('Failure request from cache', async () => {
    try {
      mockStorage.clear();
      //@ts-ignore
      await receiver.receive('+Y', {
        requestCacheStrategy: RequestCacheStrategy.CacheOnly, 
        refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways
      });
    } catch (error) {
      expect(error).toEqual(
        createError({ name: SERVICE_ERROR, status: SERVICE_ERROR_STATUS, message: SERVICE_ERROR_CACHE_RETRIEVING_FAILED })
      )
    }
  })

  it('Success request from cache - not expired', async () => {
    try {
      mockStorage.clear();
      // make network request to cache value
      //@ts-ignore
      await receiver.receive('+X', { refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways });
      //@ts-ignore
      const result = await receiver.receive('+X', {
        requestCacheStrategy: RequestCacheStrategy.CacheOnly, 
        refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways
      });
      expect(result.cached).toEqual(true);
      expect(result.expired).toEqual(false);
      mockStorage.clear();
    } catch (error) {
      throw error
    }
  })

  it('Success request from cache - expired', async () => {
    try {
      mockStorage.clear();
      // make network request to cache value
      //@ts-ignore
      await receiver.receive('+X', { refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways, ttl: 1 });
      await pause(10);
      //@ts-ignore
      const result = await receiver.receive('+X', {
        requestCacheStrategy: RequestCacheStrategy.CacheOnly, 
        refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways
      });
      expect(result.cached).toEqual(true);
      expect(result.expired).toEqual(true);
      mockStorage.clear();
    } catch (error) {
      throw error
    }
  })
})

describe('NetworkFallingBackToCache RefreshAlways', () => {

  it('Success request - network success', async () => {
    try {
      mockStorage.clear();
      //@ts-ignore
      const result = await receiver.receive('+X', {
        requestCacheStrategy: RequestCacheStrategy.NetworkFallingBackToCache, 
        refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways
      });
      expect(result).toEqual('X');
      mockStorage.clear();
    } catch (error) {
      throw error
    }
  })

  it('Failure request - network fails then cache success (not expired)', async () => {
    try {
      mockStorage.clear();
      // make network request to cache value
      //@ts-ignore
      await receiver.receive('+X', { refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways });
      //@ts-ignore
      const result = await receiver.receive('-X', {
        requestCacheStrategy: RequestCacheStrategy.NetworkFallingBackToCache, 
        refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways
      });
      expect(result.cached).toEqual(true);
      expect(result.expired).toEqual(false);
    } catch (error) {
      throw error
    }
  })

  it('Failure request - network fails then cache success (expired)', async () => {
    try {
      mockStorage.clear();
      // make network request to cache value
      //@ts-ignore
      await receiver.receive('+X', { refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways, ttl: 1 });
      await pause(10);
      //@ts-ignore
      const result = await receiver.receive('-X', {
        requestCacheStrategy: RequestCacheStrategy.NetworkFallingBackToCache, 
        refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways
      });
      expect(result.cached).toEqual(true);
      expect(result.expired).toEqual(true);
    } catch (error) {
      throw error
    }
  })

  it('Failure request - network fails then cache fails', async () => {
    try {
      mockStorage.clear();
      //@ts-ignore
      const result = await receiver.receive('-X', {
        requestCacheStrategy: RequestCacheStrategy.NetworkFallingBackToCache, 
        refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways
      });
      throw 'There should be the exception'
    } catch (error) {
      expect(error).toEqual(
        createError({ name: SERVICE_ERROR, status: SERVICE_ERROR_STATUS, message: SERVICE_ERROR_NETWORK_THEN_CACHE_RETRIEVING_FAILED })
      )
    } 
  })

})

describe('CacheFallingBackToNetwork RefreshAlways', () => {

  it('Success request from cache - not expired', async () => {
    try {
      mockStorage.clear();
      // make network request to cache value
      //@ts-ignore
      await receiver.receive('+X', { refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways });
      // bad network request will not be called 
      //@ts-ignore
      const result = await receiver.receive('-X', {
        requestCacheStrategy: RequestCacheStrategy.CacheFallingBackToNetwork, 
        refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways
      });
      expect(result.cached).toEqual(true);
      expect(result.expired).toEqual(false);
      mockStorage.clear();
    } catch (error) {
      throw error
    }
  })

  it('Success request from cache - expired, then success network', async () => {
    try {
      mockStorage.clear();
      // make network request to cache value
      //@ts-ignore
      await receiver.receive('+X', { refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways, ttl: 1 });
      await pause(10);
      //@ts-ignore
      const result = await receiver.receive('+X', {
        requestCacheStrategy: RequestCacheStrategy.CacheFallingBackToNetwork, 
        refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways
      });
      expect(result).toEqual('X');
      mockStorage.clear();
    } catch (error) {
      throw error
    }
  })

  it('Success request from cache - expired, then failure network', async () => {
    try {
      mockStorage.clear();
      // make network request to cache value
      //@ts-ignore
      await receiver.receive('+X', { refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways, ttl: 1 });
      await pause(10);
      //@ts-ignore
      const result = await receiver.receive('-X', {
        requestCacheStrategy: RequestCacheStrategy.CacheFallingBackToNetwork, 
        refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways
      });
      mockStorage.clear();
    } catch (error) {
      expect(error).toEqual(
        createError({ name: SERVICE_ERROR, status: SERVICE_ERROR_STATUS, message: SERVICE_ERROR_CACHE_THEN_NETWORK_RETRIEVING_FAILED })
      )
    }
  })

  it('Failure request from cache then network success', async () => {
    try {
      mockStorage.clear();
      //@ts-ignore
      const result = await receiver.receive('+X', {
        requestCacheStrategy: RequestCacheStrategy.CacheFallingBackToNetwork, 
        refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways
      });
      expect(result).toEqual('X');
      mockStorage.clear();
    } catch (error) {
      throw error
    }
  })

  it('Failure request from cache then network failure', async () => {
    try {
      mockStorage.clear();
      //@ts-ignore
      const result = await receiver.receive('-X', {
        requestCacheStrategy: RequestCacheStrategy.CacheFallingBackToNetwork, 
        refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways
      });
      mockStorage.clear();
    } catch (error) {
      expect(error).toEqual(
        createError({ name: SERVICE_ERROR, status: SERVICE_ERROR_STATUS, message: SERVICE_ERROR_CACHE_THEN_NETWORK_RETRIEVING_FAILED })
      )
    }
  })

})

describe('CacheThenNetwork RefreshAlways', () => {
  
  it('Success request from cache (not expired) - then success network request', async () => {
    try {
      const handlerHistory: any[] = [];
      mockStorage.clear();
      // make network request to cache value
      //@ts-ignore
      await receiver.receive('+X', { refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways });
      //@ts-ignore
      const result = await receiver.receive('+X', {
        requestCacheStrategy: RequestCacheStrategy.CacheThenNetwork, 
        refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways,
        onSuccess: args => handlerHistory.push({ handler: 'onSuccess', args }),
        onError: args => handlerHistory.push({ handler: 'onError', args }),
        onLoading: args => handlerHistory.push({ handler: 'onLoading', args }),
        onFinally: () => handlerHistory.push({ handler: 'onFinally' }),
      });
      expect(result.cached.cached).toEqual(true);
      expect(result.cached.expired).toEqual(false);
      const deferred = await result.network;
      expect(deferred).toEqual('X');
      
      const expectedHandlerHistory = [
        {
          handler: 'onLoading',
          args: { loading: true, network: false }
        }, {
          handler: 'onLoading',
          args: { loading: false, network: false }
        }, {
          handler: 'onSuccess',
          args: { "0":"X", cached: true, expired: false }
        }, {
          handler: 'onLoading',
          args: { loading: true, network: true }
        }, {
          handler: 'onSuccess',
          args: "X"
        }, {
          handler: 'onLoading',
          args: { loading: false, network: true }
        }, {
          handler: 'onFinally'
        }
      ];

      expect(handlerHistory).toEqual(expectedHandlerHistory);
      mockStorage.clear();
    } catch (error) {
      throw error
    }
  })

  it('Success request from cache (not expired) - then failure network request', async () => {
    try {
      mockStorage.clear();
      // make network request to cache value
      //@ts-ignore
      await receiver.receive('+X', { refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways });
      //@ts-ignore
      const result = await receiver.receive('-X', {
        requestCacheStrategy: RequestCacheStrategy.CacheThenNetwork, 
        refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways
      });
      expect(result.cached.cached).toEqual(true);
      expect(result.cached.expired).toEqual(false);
      mockStorage.clear();
      await result.network;
      throw 'Exception must be thrown';
    } catch (error) {
      expect(error).toEqual(NETWORK_ERROR)
    }
  })

  it('Success request from cache (expired) - then success network request', async () => {
    try {
      const handlerHistory: any[] = [];
      mockStorage.clear();
      // make network request to cache value
      //@ts-ignore
      await receiver.receive('+X', { refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways, ttl: 1 });
      await pause(10);
      //@ts-ignore
      const result = await receiver.receive('+X', {
        requestCacheStrategy: RequestCacheStrategy.CacheThenNetwork, 
        refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways,
        onSuccess: args => handlerHistory.push({ handler: 'onSuccess', args }),
        onError: args => handlerHistory.push({ handler: 'onError', args }),
        onLoading: args => handlerHistory.push({ handler: 'onLoading', args }),
        onFinally: () => handlerHistory.push({ handler: 'onFinally' }),
      });
      expect(result.cached.cached).toEqual(true);
      expect(result.cached.expired).toEqual(true);
      const deferred = await result.network;
      expect(deferred).toEqual('X');
      
      const expectedHandlerHistory = [
        {
          handler: 'onLoading',
          args: { loading: true, network: false }
        }, {
          handler: 'onLoading',
          args: { loading: false, network: false }
        }, {
          handler: 'onSuccess',
          args: { "0":"X", cached: true, expired: true }
        }, {
          handler: 'onLoading',
          args: { loading: true, network: true }
        }, {
          handler: 'onSuccess',
          args: "X"
        }, {
          handler: 'onLoading',
          args: { loading: false, network: true }
        }, {
          handler: 'onFinally'
        }
      ];
      expect(handlerHistory).toEqual(expectedHandlerHistory);
      mockStorage.clear();
    } catch (error) {
      throw error
    }
  })

  it('Success request from cache (expired) - then failure network request', async () => {
    try {
      mockStorage.clear();
      // make network request to cache value
      //@ts-ignore
      await receiver.receive('+X', { refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways, ttl: 1 });
      await pause(10);
      //@ts-ignore
      const result = await receiver.receive('-X', {
        requestCacheStrategy: RequestCacheStrategy.CacheThenNetwork, 
        refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways
      });
      expect(result.cached.cached).toEqual(true);
      expect(result.cached.expired).toEqual(true);
      mockStorage.clear();
      await result.network;
      throw 'Exception must be thrown';
    } catch (error) {
      expect(error).toEqual(NETWORK_ERROR)
    }
  })

  it('Failure request from cache - then success network request', async () => {
    try {
      const handlerHistory: any[] = [];
      mockStorage.clear();
      //@ts-ignore
      const result = await receiver.receive('+X', {
        requestCacheStrategy: RequestCacheStrategy.CacheThenNetwork, 
        refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways,
        onSuccess: args => handlerHistory.push({ handler: 'onSuccess', args }),
        onError: args => handlerHistory.push({ handler: 'onError', args }),
        onLoading: args => handlerHistory.push({ handler: 'onLoading', args }),
        onFinally: () => handlerHistory.push({ handler: 'onFinally' }),
      });
      expect(result).not.toHaveProperty('cached');
      const deferred = await result.network;
      expect(deferred).toEqual('X');
      mockStorage.clear();
      
      const expectedHandlerHistory = [
        {
          handler: 'onLoading',
          args: { loading: true, network: false }
        }, {
          handler: 'onLoading',
          args: { loading: false, network: false }
        }, {
          handler: 'onError',
          args: createError({
            name: SERVICE_ERROR,
            status: SERVICE_ERROR_STATUS,
            message: SERVICE_ERROR_CACHE_RETRIEVING_FAILED,
            isNetworkError: false
          })
        }, {
          handler: 'onLoading',
          args: { loading: true, network: true }
        }, {
          handler: 'onSuccess',
          args: "X"
        }, {
          handler: 'onLoading',
          args: { loading: false, network: true }
        }, {
          handler: 'onFinally'
        }
      ];

      expect(handlerHistory).toEqual(expectedHandlerHistory);
    } catch (error) {
      throw error
    }
  })

  it('Failure request from cache - then failure network request (handle error via catch)', async () => {
    const handlerHistory: any[] = [];
    try {
      mockStorage.clear();
      //@ts-ignore
      const result = await receiver.receive('-X', {
        requestCacheStrategy: RequestCacheStrategy.CacheThenNetwork, 
        refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways,
        onSuccess: args => handlerHistory.push({ handler: 'onSuccess', args }),
        onLoading: args => handlerHistory.push({ handler: 'onLoading', args }),
        onFinally: () => handlerHistory.push({ handler: 'onFinally' }),
      });
      expect(result).not.toHaveProperty('cached');
      mockStorage.clear();
      await result.network;
      throw 'Exception must be thrown';
    } catch (error) {
      const expectedHandlerHistory = [
        {
          handler: 'onLoading',
          args: { loading: true, network: false }
        }, {
          handler: 'onLoading',
          args: { loading: false, network: false }
        }, {
          handler: 'onLoading',
          args: { loading: true, network: true }
        }, {
          handler: 'onLoading',
          args: { loading: false, network: true }
        }, {
          handler: 'onFinally'
        }
      ];

      expect(handlerHistory).toEqual(expectedHandlerHistory);
      expect(error).toEqual(NETWORK_ERROR)
    }
  })

  it('Failure request from cache - then failure network request (handle error via error handler)', async () => {
    const handlerHistory: any[] = [];
    try {
      mockStorage.clear();
      //@ts-ignore
      const result = await receiver.receive('-X', {
        requestCacheStrategy: RequestCacheStrategy.CacheThenNetwork, 
        refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways,
        onSuccess: args => handlerHistory.push({ handler: 'onSuccess', args }),
        onError: args => handlerHistory.push({ handler: 'onError', args }),
        onLoading: args => handlerHistory.push({ handler: 'onLoading', args }),
        onFinally: () => handlerHistory.push({ handler: 'onFinally' }),
      });
      expect(result).not.toHaveProperty('cached');
      await result.network;
      
      const expectedHandlerHistory = [
        {
          handler: 'onLoading',
          args: { loading: true, network: false }
        }, {
          handler: 'onLoading',
          args: { loading: false, network: false }
        }, {
          handler: 'onError',
          args: createError({
            name: SERVICE_ERROR,
            status: SERVICE_ERROR_STATUS,
            message: SERVICE_ERROR_CACHE_RETRIEVING_FAILED,
            isNetworkError: false
          })
        }, {
          handler: 'onLoading',
          args: { loading: true, network: true }
        }, {
          handler: 'onError',
          args: createError({
            name: NETWORK_ERROR,
            status: NETWORK_ERROR_STATUS,
            message: NETWORK_ERROR_REQUEST_HAS_FAILED,
            isNetworkError: true
          })
        }, {
          handler: 'onLoading',
          args: { loading: false, network: true }
        }, {
          handler: 'onFinally'
        }
      ];
      expect(handlerHistory).toEqual(expectedHandlerHistory);
      mockStorage.clear();
    } catch (error) {
      throw error
    }
  })

})