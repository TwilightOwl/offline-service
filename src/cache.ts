export enum RefreshCacheStrategy {
    RefreshWhenExpired,
    RefreshAlways,
    NoStore
}

export enum RequestCacheStrategy {
    CacheOnly,
    NetworkOnly,
    CacheFallingBackToNetwork,
    NetworkFallingBackToCache,
    CacheThenNetwork
}

export enum RequestTypes {
    DataSendRequest,
    DataReceiveRequest
}

interface RequestInitWithCacheParameters extends RequestInit {
    refreshCacheStrategy?: RefreshCacheStrategy,
    requestCacheStrategy?: RequestCacheStrategy,
    requestType?: RequestTypes
}

enum CacheStatus {
    DoesNotExist,
    Unexpired,
    Expired,
}

export interface ResponseWithCacheInfo extends Response {
    cached?: boolean,
    expired?: boolean
}

type MergeResponseWithCacheInfo = (response: Response, cacheStatus: CacheStatus | undefined) => ResponseWithCacheInfo;

interface RequestResult {
    response: Response,
    cacheStatus?: CacheStatus
}

interface CacheThenNetworkRequestResult {
    response?: Response,
    cacheStatus?: CacheStatus
}

type RequestFunction = (url: RequestInfo, params?: RequestInit) => Promise<RequestResult>;

type CacheThenNetworkRequestFunction = (url: RequestInfo, params?: RequestInit) => Promise<CacheThenNetworkRequestResult>;

enum CachingResult {
    // HasBeenAdded,
    HasBeenUpdated,
    NotUpdated
}

type CachingFunction = (url: RequestInfo, params: RequestInit | undefined, data: any, cacheStatus?: CacheStatus) => Promise<CachingResult>;

export interface CacheThenNetworkRequestStrategyResult {
    cached?: ResponseWithCacheInfo,
    network: Promise<ResponseWithCacheInfo>
}

type CustomRequest = (url: RequestInfo, params: RequestInitWithCacheParameters) => Promise<ResponseWithCacheInfo | CacheThenNetworkRequestStrategyResult>;

type HttpRequest = (url: RequestInfo, data?: RequestInit) => Promise<Response>;

interface CachedItem {
    key: string,
    data: any, // Response
    until: number
}

interface Storage {
    //TODO: return result 
    set: (key: string, data: CachedItem) => Promise<boolean>,
    get: (key: string) => Promise<null | CachedItem>,
    delete: (key: string) => Promise<boolean>,
}

type GetCacheKey = (url: RequestInfo, params?: RequestInit) => string;

type Serializer = (response: Response) => any;

interface Constructor {
    request: HttpRequest,
    storage: Storage,
    getCacheKey: GetCacheKey,
    serializer: Serializer
}

export default class OfflineService {
    private httpRequest: HttpRequest;
    private storage: Storage;
    private getCacheKey: GetCacheKey;
    private serializer: Serializer;

    constructor({ request, storage, getCacheKey, serializer }: Constructor) {
        this.httpRequest = request;
        this.storage = storage;
        //TODO: implement key extractor
        this.getCacheKey = getCacheKey;
        this.serializer = serializer;
    }

    // ==================== Storage functions ====================
     
    private setCacheItem = async (key: string, data: any, ttl = 10000) => {
        return this.storage.set(key, { key, data, until: Date.now() + ttl });
    }

    private getCacheItem = async (key: string) => {
        const cached = await this.storage.get(key);
        if (cached === null) {
            return { exist: false }
        } else {
            return { 
                exist: true, 
                expired: cached.until < Date.now(), 
                data: cached.data 
            };
        }
    }

    // ==================== Request functions ====================

    private networkOnlyRequest: RequestFunction = async (...args) => {
        const response = await this.httpRequest(...args);
        return ({ response: { ...response, serialized: await this.serializer(response) } }) as RequestResult;
    }
    
    private cacheOnlyRequest: RequestFunction = async (url, params) => {
        const cacheKey = this.getCacheKey(url, params);
        const { exist, expired, data } = await this.getCacheItem(cacheKey);
        if (exist) {
            return { response: data, cacheStatus: expired ? CacheStatus.Expired : CacheStatus.Unexpired }
        } else {
            //TODO: think about format of this error
            throw "The requested data doesn't exist in the cache"
        }
    };
    
    private networkFallingBackToCacheRequest: RequestFunction = async (url, params) => {
        try {
            const { response } = await this.networkOnlyRequest(url, params);
            if (response.ok) {
                return { response }
            } else {
                throw response
            }
        } catch (networkError) {
            try {
                // without "await" catch block will not handle exception!
                return await this.cacheOnlyRequest(url, params);
            } catch (cacheError) {
                //TODO: think about format of this error, maybe provide networkError somehow...
                throw "The network request has been failed but cached data doesn't exist"
            }
        }
    };
    
    private cacheFallingBackToNetworkRequest: RequestFunction = async (url, params) => {
        try {
            const { response, cacheStatus } = await this.cacheOnlyRequest(url, params);
            if (cacheStatus === CacheStatus.Unexpired) {
                return { response, cacheStatus }
            } else {
                throw "The cache data is expired"
            }
        } catch (cacheError) {
            try {
                return await this.networkOnlyRequest(url, params);
            } catch (networkError) {
                //TODO: think about format of this error, maybe provide networkError somehow...
                throw "The cache doesn't exist or expired but network request has been faild"
            }
        }
    }
    
    // It's just a first part of algorythm, in the "request" method a second part will be invoked 
    //   by recursive call of "request" with NetworkOnly strategy
    private cacheThenNetworkRequest: CacheThenNetworkRequestFunction = async (url, params) => {
        try {
            return await this.cacheOnlyRequest(url, params)
        } catch (error) {
            return { cacheStatus: CacheStatus.DoesNotExist }
        }
    }

    // ==================== Caching functions ====================

    private refreshAlwaysCaching: CachingFunction = async (url, params, data, cacheStatus) => {
        if (cacheStatus !== undefined) {
            // the data has been received from cache, we sholudn't update cache data
            return CachingResult.NotUpdated
        }
        const cacheKey = this.getCacheKey(url, params);
        try {
            await this.setCacheItem(cacheKey, data);
            return CachingResult.HasBeenUpdated
        } catch (error) {
            //TODO: think
            throw error
        }
    };
    
    private refreshWhenExpiredCaching: CachingFunction = async (url, params, data, cacheStatus) => {
        if (cacheStatus !== undefined) {
            // the data has been received from cache, we sholudn't update cache data
            return CachingResult.NotUpdated
        }
    
        const cacheKey = this.getCacheKey(url, params);
        const { exist, expired, ...rest } = await this.getCacheItem(cacheKey);
        if (exist && !expired) {
            return CachingResult.NotUpdated
        } else {
            await this.setCacheItem(cacheKey, data);
            return CachingResult.HasBeenUpdated
        }
    
    };

    private mergeResponseWithCachedInfo: MergeResponseWithCacheInfo = (response: Response, cacheStatus: CacheStatus | undefined) => {
        return cacheStatus === undefined
            ? response 
            : { ...response, cached: true, expired: cacheStatus === CacheStatus.Expired }
    }

    public request = async (url: RequestInfo, params: RequestInitWithCacheParameters) => {
        const { 
            requestType = RequestTypes.DataReceiveRequest, 
            // requestCacheStrategy = RequestCacheStrategy.CacheFallingBackToNetwork, 
            // refreshCacheStrategy = RefreshCacheStrategy.RefreshAlways,
            ...rest
        } = params;
        return requestType === RequestTypes.DataSendRequest ? await this.sendRequest(url, rest) : await this.receiveRequest(url, rest)
    }

    private sendRequest: CustomRequest = async (url: RequestInfo, params: RequestInitWithCacheParameters) => {
        return Promise.resolve({} as CacheThenNetworkRequestStrategyResult)
        //const cacheKey = this.getCacheKey(url, params)
        //await this.saveToQueue({ url, params, cacheKey, entity: (params || {}).entity || undefined });

    }

    private receiveRequest: CustomRequest = async (url: RequestInfo, params: RequestInitWithCacheParameters) => {
        const { 
            refreshCacheStrategy = RefreshCacheStrategy.RefreshAlways,
            requestCacheStrategy = RequestCacheStrategy.CacheFallingBackToNetwork, 
            // requestType = RequestTypes.DataReceiveRequest, 
            ...restParams 
        } = params;
        //if (requestType === RequestTypes.DataReceiveRequest) {
            try {
                const { response, cacheStatus } = await ({
                    [RequestCacheStrategy.NetworkOnly]: this.networkOnlyRequest,
                    [RequestCacheStrategy.CacheOnly]: this.cacheOnlyRequest,
                    [RequestCacheStrategy.NetworkFallingBackToCache]: this.networkFallingBackToCacheRequest,
                    [RequestCacheStrategy.CacheFallingBackToNetwork]: this.cacheFallingBackToNetworkRequest,
                    [RequestCacheStrategy.CacheThenNetwork]: this.cacheThenNetworkRequest,
                }[requestCacheStrategy] || (() => { throw 'Unknown request cache strategy' }))(url, restParams);
    
                if (requestCacheStrategy === RequestCacheStrategy.CacheThenNetwork) {
                    return {
                        ...response ? { cached: this.mergeResponseWithCachedInfo(response, cacheStatus) } : {},
                        network: this.receiveRequest(url, { ...params, requestCacheStrategy: RequestCacheStrategy.NetworkOnly }) as Promise<ResponseWithCacheInfo>
                    }
                }
    
                if (response!.ok) {
                    try {
                        // We have not to wait cache update and we don't need the result of caching
                        // const cacheResult = await ({
                        ({
                            [RefreshCacheStrategy.NoStore]: () => {},
                            [RefreshCacheStrategy.RefreshAlways]: this.refreshAlwaysCaching,
                            [RefreshCacheStrategy.RefreshWhenExpired]: this.refreshWhenExpiredCaching,
                        }[refreshCacheStrategy] || (() => { throw 'Unknown refresh cache strategy' }))(url, restParams, response, cacheStatus);
                        
                        return this.mergeResponseWithCachedInfo(response!, cacheStatus);
    
                    } catch (error) {
                        //TODO: provide error object
                        throw 'Caching has been failed'
                    }
                } else {
                    //TODO: to think about this case
                    throw response
                }
            } catch (error) {
                throw error;
            }
    
        //} else if (requestType === RequestTypes.DataSendRequest) {
            // TODO: big work!!!!!!!

            /**
             * 1. записать в сторадж (если очередь на отправку пустая, то в сторадж пишем только если пришла ошибка отправки нашего запроса,
             *      если очередь не пустая, не важно нету сейчас соединения или запросы из очереди прямо сейчас отправляются успешно, пишем
             *      сначала в сторадж, а потом добавляем в очередь запрос. т.к. вполне возмоно при наличии сети, что просто до запроса не дойдет
             *      очередь потому что пользователь вырубил приложение)
             *  - hash, 
             *  - response 
             *  - requestId (по сути только url, параметризуется можно ли слать еще запросы на этот url (но с другим хэшэм) когда уже есть 
             *      неотправленные запросы
             *  - entity возможно понадобится для чтения сущностей
             *  - автоматизировать подсовывание в гет запросы сущностей, не отправленных в пост запросах нельзя т.к.:
             *      - не известно в каком формате должны придти сохраненные сущности ведь они еще не сохранены
             *      - связь между гет запрами и неотправленными сущностями может быть "много ко многим" тогда не обойтись одим только entity и 
             *          вообще сервис не должен знать о смысловой нагрузке данных и бизнес логике и потому не сможет подсовывать в гет запросы 
             *          какие-то сохраненные данные, это дело бизнес логики, по entity БЛ сможет получить неотправленные данные и как-то их 
             *          обработав подсунуть в гет запрос
             * 
             * 2. если есть данные для отправки, то уже должен быть запущен "параллельный" процесс по отправке данных, но при добавлении новых 
             *      данных, нужно не ждать следующую итерацию отправки, а сразу попробовать запустить
             *  - избегать утечки
             *  - когда данных для отправки нет, то и в фоне не должно выполняться никаких проверок, процесс запускается при сохраненнии 
             *      данных и продолжается пока есть неотправленные данные
             *  - нужно сохранять последовательность с которой пользователь пытался отправить данные!!!
             *  - у очереди должен быть текущий статус - есть сеть или нету, по результату последнего на данный момент выполненного запроса,
             *      если статус НЕТ СЕТИ новый запрос при попадании в очередь резолвится сразу с ошибкой сети и вторым промисом (описано дальше) 
             *      если статус ЕСТЬ СЕТЬ то новый добавленный в очередь запрос ожидает своей очереди на отправку, т.е. первый промис в 
             *      состоянии ожидания. для внешнего вызываемого этот запрос приложения будет как-будто запрос просто долго выполняется
             * 
             * 3. Публичная функция отправки (запись в сторадж -> сетевой запрос) должна быть промисом, который при нормальной работе должен 
             *      зарезолвиться (реджект если в сторадж не удалось записать, т.е. какие-то не предвиденные технические ошибки) и вернуть:
             *      - (1) результат запроса (в случае рабочей сети, при этом сам результат может быть и плохим (допустимые ошибки бизнес логики
             *          с сервера), не рабочую сеть надо определять по эксепшену fetch'а или ok=false, надо в доке уточнить) Как обрабатывать
             *          5хх ошибки? сохранять ли порядок запросов если застопорились на 5хх и новые запросы даже не будут пытаться отправляться
             *          т.к. застряли на каком-то запросе с ответом 5хх, что это? ошибка безнес логики или ошибка сервера?
             *      - (2) другой промис, который зарезолвится, когда эти данные все таки отправятся через фоновый процесс, этот промис должен вернуть 
             *          результат как в первом случае. ( * * * После перезапуска приложения неотправленные запросы десериализуются из стораджа, 
             *          но промисов уже нет, колбэки тоже не сериализовать, можно сделать эмиттер, а после перезапуска приложения, кому надо тот 
             *          подпишется на события отправления данных, но это слишком заморочено, и не понятно пока как в коде это сделать лаконично, 
             *          и вообще нужно ли после перезапуска приложения отслеживать отправку ранее не отправленных данных??? * * * )
             *          В этом случае (2) мы знаем что такой результат говорит о том, что данные сохранились в сторадж
             *          и бизнес логика должна как-то узнать об этом, т.к. могут быть какие-то данные в интерфейсе полученные гет запросом, но к 
             *          ним надо подмешать эти сохраненные пока еще не отправленные данные. А при завершении второго промиса, мы понимаем что данные
             *          успешно отправились на сервер (или не успешно, в случае ошибок с сервера, которые допускает логика работы приложения) и 
             *          удалились из стораджа -> надо опять проинформировать бизнес логику о том что теперь этих данных нет в сторадже и бери их
             *          с сервера нормальным гет запросом (теперь если сети нету, то гет запрос может сфэйлиться и данные возьмутся из кэша, но 
             *          в кэше данные с прошлого гет запроса и данных которые мы отправили пост запросов там еще нету, можно пренебречь этой
             *          ситуацией как редкой, 
             *          // --- этот блок сильно замороченный и для обычной работы он не нужен, только если сильно упороться --- //
             *          но можно оставлять в сторадже данные, пометив их как отправленные, и они будут использоваться только лишь 
             *          для подмешивания в устаревшие данные из кэша. когда гет запрос все таки выполнится, кэш обновится, в не уже будут эти 
             *          добавленные данные, т.к. они теперь с бэка придут, и в стордже их можно почистить. тогда надо придумывать механизм 
             *          подсчета ссылок, т.к. эти отправленные но оставшиеся данные в сторадже могут быть использованы разными гет запросами)
             *          // ---------------------------------------------------------------------------------------------------- //
             *          Информировать БЛ о данных сохраненных и удаленных в стордже нужно через механизм подписок или колбэков, но потом эти
             *          обработчики уже обновляют mobx сторы бизнес логики, чтобы сам сервис не был завязан на mobx. Или когда вернулся результат (2)
             *          это и значит что в сторадже появилист данные, а когда в будущем зарезолвится возвращенный промис, это значит данные отправились.
             *          Эти данные из стораджа могут понадобиться вообще в другом месте а не в месте вызова публичного метода отправки, поэтому
             *          их надо взяв из стораджа положить в observable, а любые другие публичные данные любых сторов, которые в результат гет запроса 
             *          подмешивают стордж данные, должны быть computed и завязаны на observable пришедшие с гет запроса и observable пришедший со
             *          стораджа. 
             *  
             *          Пример показывающий как данные полученные гет запросом в AnyBusinessMobxStore могут быть совмещены с данными которые были
             *              неуспешно отправлены пост запросом из стора AnyOtherBusinessMobxStore. TempStorageMobxStore - стор для хранения 
             *              observable копий данных из стораджа (данных находящихся в очереди на отправку)
             *          
             *        AnyBusinessMobxStore:
             *          receiveRequest  ->  observable items  ->  computed dataForUI = this.items + TempStorageMobxStore.savedButNotSentData[entity]
             *                                                                                                                   ^
             *        TempStorageMobxStore:                                                                                       \
             *          observable savedButNotSentData = { [entity]: ... , [entity]: ... }                                         \ computed reaction
             *                                                                                                                      \    
             *        AnyOtherBusinessMobxStore:                                                                                     \      
             *          sendRequest(entity)  ->  (bad network)  ->  TempStorageMobxStore.actionRetrieveFromStorageByEntity(entity): savedButNotSentData[entity] = savedData
             *                                                  \
             *                                                   \промис отвечающий за реальную отправку данных на сервер резолвится   
             *                                                    \
             *                                                  чистим данные в сторе, т.к. этих данных теперь нету в сторадже - они успешно (или не успешно, но это норм, если бэку данные не понравились) отправлены на сервер
             *                                                  TempStorageMobxStore.actionClearDataByEntity(entity): delete savedButNotSentData[entity]
             *  
             *           sendRequest(entity)  ->  (good network) ->  как-то вручную в бизнес логике запускать AnyBusinessMobxStore.receiveRequest.
             *              Или предумать вообще систему отдельную от этой, которая будет хранить зависимости данных между сторами, и запускать
             *              получение данных с сервера автоматически, через реакции. Либо как-то инвалидировать кэш.
             *  
             *  Пример попадания запросов в очередь:
             *      - запрос пришел. очередь пуста?
             *          ? пытаемся отправить. результат переводим в бинарный: есть сеть (2хх, 4хх,  5хх???) или нет сети (5хх ???, catch)
             *            если во время выполнения запроса прилетает новый запрос, пишем данные нового запроса в сторадж и помещаем новый запрос 
             *            в очередь. при инициализации очереди, у нее статус в сети, поэтому новый запрос просто будет ждать своей очереди.
             *            текущий запрос выполнился с результатом ЕСТЬ СЕТЬ?
             *              ? резолвим основной промис с результатом запроса, выкидываем из очереди запрос, т.к. он уже успешно выполнился,
             *                  статус очереди ставим ЕСТЬ СЕТЬ, переходим к выполнению следующего запроса в очереди (если есть)
             *              : пишем данные запроса в сторадж, резолвим основной промис с результатом НЕТ СЕТИ и со вторым промисом, ожидающим
             *                  успешного завершения запроса. сам запрос остается в очереди, но с ожидающим вторым промисом. для всех запросов
             *                  в очереди (которые еще не зарезолвили основной промис) резолвим по аналогии с текущим запросом, и так же оставляем
             *                  их в очереди с промисом ожидающим корректного завершения запроса.
             *          : пишем данные нового запроса в сторадж и помещаем новый запрос в очередь. текущее состояние очереди == ЕСТЬ СЕТЬ?
             *              ? до этого запроса очередь сама дойдет.
             *              : резолвим основной промис с результатом НЕТ СЕТИ и со вторым промисом, ожидающим успешного завершения запроса. запрос
             *                  остается в очереди.
             *      - если очередь не пустая в статусе НЕТ СЕТИ, то периодически запускается попытка отправки заново первого запроса в сети.
             *      - если в непустую очередь со статусом НЕТ СЕТИ попадает новый запрос, то не дожидаясь следующего автоматического запуска
             *          попытки отправки первого запроса в очереди, сами запускаем ее, при этом таск для автоматической отправки удаляется,
             *          но при неуспешной отправке опять запускается новый таск (таск - запуск попытки отправки через setInterval, таск "живет
             *          в памяти" переодически запуская попытку отправки, запуская отправку вручную, мы чистим setInterval, и при отсутствии сети
             *          создаем новый таск - новый setInterval) при первой же успешной отправке запроса, текущий таск должен чиститься.
             *      - для перестраховки, чтобы таск не запустил тот же запрос или паралельно следующий, нужно в свойствах очереди также хранить
             *          флаг processing, говорящий о том что в данный момент выполняются запросы в очереди. при успешном завершении запроса и
             *          переходе к следующему запросу, processing остается true. если автоматический таск при попытке запустить отправку запроса
             *          натыкается на состояние processing == true, значит что-то пошло не так и остался не удаленный таск, поэтому: 
             *          не запускаем попытку отправки запроса (уже запущено), таск удаляем, новый таск создастся если очередной запрос опять 
             *          сфэйлится с ошибкой отсутствия сети
             */

            throw 'TODO'
        // } else {
        //     throw 'Unknown request type';
        // }
    }
}