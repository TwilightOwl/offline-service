/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var RefreshCacheStrategy;
(function (RefreshCacheStrategy) {
    RefreshCacheStrategy[RefreshCacheStrategy["RefreshWhenExpired"] = 0] = "RefreshWhenExpired";
    RefreshCacheStrategy[RefreshCacheStrategy["RefreshAlways"] = 1] = "RefreshAlways";
    RefreshCacheStrategy[RefreshCacheStrategy["NoStore"] = 2] = "NoStore";
})(RefreshCacheStrategy || (RefreshCacheStrategy = {}));
var RequestCacheStrategy;
(function (RequestCacheStrategy) {
    RequestCacheStrategy[RequestCacheStrategy["CacheOnly"] = 0] = "CacheOnly";
    RequestCacheStrategy[RequestCacheStrategy["NetworkOnly"] = 1] = "NetworkOnly";
    RequestCacheStrategy[RequestCacheStrategy["CacheFallingBackToNetwork"] = 2] = "CacheFallingBackToNetwork";
    RequestCacheStrategy[RequestCacheStrategy["NetworkFallingBackToCache"] = 3] = "NetworkFallingBackToCache";
    RequestCacheStrategy[RequestCacheStrategy["CacheThenNetwork"] = 4] = "CacheThenNetwork";
})(RequestCacheStrategy || (RequestCacheStrategy = {}));
var RequestTypes;
(function (RequestTypes) {
    RequestTypes[RequestTypes["DataSendRequest"] = 0] = "DataSendRequest";
    RequestTypes[RequestTypes["DataReceiveRequest"] = 1] = "DataReceiveRequest";
})(RequestTypes || (RequestTypes = {}));
var CacheStatus;
(function (CacheStatus) {
    CacheStatus[CacheStatus["DoesNotExist"] = 0] = "DoesNotExist";
    CacheStatus[CacheStatus["Unexpired"] = 1] = "Unexpired";
    CacheStatus[CacheStatus["Expired"] = 2] = "Expired";
})(CacheStatus || (CacheStatus = {}));
var CachingResult;
(function (CachingResult) {
    // HasBeenAdded,
    CachingResult[CachingResult["HasBeenUpdated"] = 0] = "HasBeenUpdated";
    CachingResult[CachingResult["NotUpdated"] = 1] = "NotUpdated";
})(CachingResult || (CachingResult = {}));
var OfflineService = /** @class */ (function () {
    function OfflineService(_a) {
        var _this = this;
        var request = _a.request, storage = _a.storage, getCacheKey = _a.getCacheKey;
        // ==================== Storage functions ====================
        this.setCacheItem = function (key, data, ttl) {
            if (ttl === void 0) { ttl = 10000; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.storage.set(key, { key: key, data: data, until: Date.now() + ttl })];
                });
            });
        };
        this.getCacheItem = function (key) { return __awaiter(_this, void 0, void 0, function () {
            var cached;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(key)];
                    case 1:
                        cached = _a.sent();
                        if (cached === null) {
                            return [2 /*return*/, { exist: false }];
                        }
                        else {
                            return [2 /*return*/, {
                                    exist: true,
                                    expired: cached.until < Date.now(),
                                    data: cached.data
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        // ==================== Request functions ====================
        this.networkOnlyRequest = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = {};
                            return [4 /*yield*/, this.httpRequest.apply(this, args)];
                        case 1: return [2 /*return*/, (_a.response = _b.sent(), _a)];
                    }
                });
            });
        };
        this.cacheOnlyRequest = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            var cacheKey, _a, exist, expired, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cacheKey = this.getCacheKey(url, params);
                        return [4 /*yield*/, this.getCacheItem(cacheKey)];
                    case 1:
                        _a = _b.sent(), exist = _a.exist, expired = _a.expired, data = _a.data;
                        if (exist) {
                            return [2 /*return*/, { response: data, cacheStatus: expired ? CacheStatus.Expired : CacheStatus.Unexpired }];
                        }
                        else {
                            //TODO: think about format of this error
                            throw "The requested data doesn't exist in the cache";
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.networkFallingBackToCacheRequest = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            var response, networkError_1, cacheError_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 7]);
                        return [4 /*yield*/, this.networkOnlyRequest(url, params)];
                    case 1:
                        response = (_a.sent()).response;
                        if (response.ok) {
                            return [2 /*return*/, { response: response }];
                        }
                        else {
                            throw response;
                        }
                        return [3 /*break*/, 7];
                    case 2:
                        networkError_1 = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.cacheOnlyRequest(url, params)];
                    case 4: 
                    // without "await" catch block will not handle exception!
                    return [2 /*return*/, _a.sent()];
                    case 5:
                        cacheError_1 = _a.sent();
                        //TODO: think about format of this error, maybe provide networkError somehow...
                        throw "The network request has been failed but cached data doesn't exist";
                    case 6: return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.cacheFallingBackToNetworkRequest = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            var _a, response, cacheStatus, cacheError_2, networkError_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 7]);
                        return [4 /*yield*/, this.cacheOnlyRequest(url, params)];
                    case 1:
                        _a = _b.sent(), response = _a.response, cacheStatus = _a.cacheStatus;
                        if (cacheStatus === CacheStatus.Unexpired) {
                            return [2 /*return*/, { response: response, cacheStatus: cacheStatus }];
                        }
                        else {
                            throw "The cache data is expired";
                        }
                        return [3 /*break*/, 7];
                    case 2:
                        cacheError_2 = _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.networkOnlyRequest(url, params)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5:
                        networkError_2 = _b.sent();
                        //TODO: think about format of this error, maybe provide networkError somehow...
                        throw "The cache doesn't exist or expired but network request has been faild";
                    case 6: return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        // It's just a first part of algorythm, in the "request" method a second part will be invoked 
        //   by recursive call of "request" with NetworkOnly strategy
        this.cacheThenNetworkRequest = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.cacheOnlyRequest(url, params)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, { cacheStatus: CacheStatus.DoesNotExist }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // ==================== Caching functions ====================
        this.refreshAlwaysCaching = function (url, params, data, cacheStatus) { return __awaiter(_this, void 0, void 0, function () {
            var cacheKey, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (cacheStatus !== undefined) {
                            // the data has been received from cache, we sholudn't update cache data
                            return [2 /*return*/, CachingResult.NotUpdated];
                        }
                        cacheKey = this.getCacheKey(url, params);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.setCacheItem(cacheKey, data)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, CachingResult.HasBeenUpdated];
                    case 3:
                        error_2 = _a.sent();
                        //TODO: think
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.refreshWhenExpiredCaching = function (url, params, data, cacheStatus) { return __awaiter(_this, void 0, void 0, function () {
            var cacheKey, _a, exist, expired, rest;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (cacheStatus !== undefined) {
                            // the data has been received from cache, we sholudn't update cache data
                            return [2 /*return*/, CachingResult.NotUpdated];
                        }
                        cacheKey = this.getCacheKey(url, params);
                        return [4 /*yield*/, this.getCacheItem(cacheKey)];
                    case 1:
                        _a = _b.sent(), exist = _a.exist, expired = _a.expired, rest = __rest(_a, ["exist", "expired"]);
                        if (!(exist && !expired)) return [3 /*break*/, 2];
                        return [2 /*return*/, CachingResult.NotUpdated];
                    case 2: return [4 /*yield*/, this.setCacheItem(cacheKey, data)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, CachingResult.HasBeenUpdated];
                }
            });
        }); };
        this.mergeResponseWithCachedInfo = function (response, cacheStatus) {
            return cacheStatus === undefined
                ? response
                : __assign({}, response, { cached: true, expired: cacheStatus === CacheStatus.Expired });
        };
        this.request = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            var _a, requestType, rest, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = params.requestType, requestType = _a === void 0 ? RequestTypes.DataReceiveRequest : _a, rest = __rest(params, ["requestType"]);
                        if (!(requestType === RequestTypes.DataSendRequest)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.sendRequest(url, rest)];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.receiveRequest(url, rest)];
                    case 3:
                        _b = _c.sent();
                        _c.label = 4;
                    case 4: return [2 /*return*/, _b];
                }
            });
        }); };
        this.sendRequest = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            var cacheKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheKey = this.getCacheKey(url, params);
                        return [4 /*yield*/, this.saveToQueue({ url: url, params: params, cacheKey: cacheKey, entity: (params || {}).entity || undefined })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.receiveRequest = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            var _a, refreshCacheStrategy, _b, requestCacheStrategy, restParams, _c, response, cacheStatus, cacheResult, error_3, error_4;
            var _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = params.refreshCacheStrategy, refreshCacheStrategy = _a === void 0 ? RefreshCacheStrategy.RefreshAlways : _a, _b = params.requestCacheStrategy, requestCacheStrategy = _b === void 0 ? RequestCacheStrategy.CacheFallingBackToNetwork : _b, restParams = __rest(params, ["refreshCacheStrategy", "requestCacheStrategy"]);
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 9, , 10]);
                        return [4 /*yield*/, ((_d = {},
                                _d[RequestCacheStrategy.NetworkOnly] = this.networkOnlyRequest,
                                _d[RequestCacheStrategy.CacheOnly] = this.cacheOnlyRequest,
                                _d[RequestCacheStrategy.NetworkFallingBackToCache] = this.networkFallingBackToCacheRequest,
                                _d[RequestCacheStrategy.CacheFallingBackToNetwork] = this.cacheFallingBackToNetworkRequest,
                                _d[RequestCacheStrategy.CacheThenNetwork] = this.cacheThenNetworkRequest,
                                _d)[requestCacheStrategy] || (function () { throw 'Unknown request cache strategy'; }))(url, restParams)];
                    case 2:
                        _c = _f.sent(), response = _c.response, cacheStatus = _c.cacheStatus;
                        if (requestCacheStrategy === RequestCacheStrategy.CacheThenNetwork) {
                            return [2 /*return*/, __assign({}, response ? { cached: this.mergeResponseWithCachedInfo(response, cacheStatus) } : {}, { network: this.request(url, __assign({}, params, { requestCacheStrategy: RequestCacheStrategy.NetworkOnly })) })];
                        }
                        if (!response.ok) return [3 /*break*/, 7];
                        _f.label = 3;
                    case 3:
                        _f.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, ((_e = {},
                                _e[RefreshCacheStrategy.NoStore] = function () { },
                                _e[RefreshCacheStrategy.RefreshAlways] = this.refreshAlwaysCaching,
                                _e[RefreshCacheStrategy.RefreshWhenExpired] = this.refreshWhenExpiredCaching,
                                _e)[refreshCacheStrategy] || (function () { throw 'Unknown refresh cache strategy'; }))(url, restParams, response, cacheStatus)];
                    case 4:
                        cacheResult = _f.sent();
                        return [2 /*return*/, this.mergeResponseWithCachedInfo(response, cacheStatus)];
                    case 5:
                        error_3 = _f.sent();
                        //TODO: provide error object
                        throw 'Caching has been failed';
                    case 6: return [3 /*break*/, 8];
                    case 7: 
                    //TODO: to think about this case
                    throw response;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_4 = _f.sent();
                        throw error_4;
                    case 10: 
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
                    throw 'TODO';
                }
            });
        }); };
        this.httpRequest = request;
        this.storage = storage;
        //TODO: implement key extractor
        this.getCacheKey = getCacheKey;
    }
    return OfflineService;
}());

export default OfflineService;
export { RefreshCacheStrategy, RequestCacheStrategy, RequestTypes };
//# sourceMappingURL=offline-service.js.map
