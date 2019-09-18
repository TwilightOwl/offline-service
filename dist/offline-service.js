import { aiInit, aiMethod, aiWithAsyncInit } from 'asynchronous-tools';

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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
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

var KEY = '__offline__';
var REGISTRY_KEY = KEY + 'registry';
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

var Storage = /** @class */ (function () {
    function Storage(storage) {
        this.sequence = 0;
        this.registry = [];
        this.storage = storage;
        // this.init()
    }
    //добавить сюда метода для кэша
    //вынести кэш в отдельный модуль
    //в этот модуль прокинуть сторадж
    Storage.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(REGISTRY_KEY)];
                    case 1:
                        data = (_a.sent());
                        this.registry = data ? data : [];
                        this.sequence = this.registry.length ? this.registry[this.registry.length - 1] : 0;
                        return [2 /*return*/];
                }
            });
        });
    };
    Storage.prototype.addCacheItem = function (key, data, ttl) {
        if (ttl === void 0) { ttl = 10000; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.storage.set(KEY + key, { key: key, data: data, until: Date.now() + ttl })];
            });
        });
    };
    Storage.prototype.getCacheItem = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var cached;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(KEY + key)];
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
        });
    };
    Object.defineProperty(Storage.prototype, "newID", {
        get: function () {
            return ++this.sequence;
        },
        enumerable: true,
        configurable: true
    });
    Storage.prototype.addRequest = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = this.newID;
                        return [4 /*yield*/, this.storage.set(KEY + id, { id: id, data: data })];
                    case 1:
                        _a.sent();
                        this.registry.push(id);
                        return [4 /*yield*/, this.storage.set(REGISTRY_KEY, this.registry)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, id];
                }
            });
        });
    };
    Storage.prototype.getRequests = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.multiGet(this.registry.map(function (id) { return KEY + id; }))];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Storage.prototype.deleteRequest = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.delete(KEY + id)];
                    case 1:
                        _a.sent();
                        this.registry = this.registry.filter(function (item) { return item !== id; });
                        return [4 /*yield*/, this.storage.set(REGISTRY_KEY, this.registry)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        aiInit,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Storage.prototype, "init", null);
    __decorate([
        aiMethod,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object, Object]),
        __metadata("design:returntype", Promise)
    ], Storage.prototype, "addCacheItem", null);
    __decorate([
        aiMethod,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], Storage.prototype, "getCacheItem", null);
    __decorate([
        aiMethod,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], Storage.prototype, "addRequest", null);
    __decorate([
        aiMethod,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Storage.prototype, "getRequests", null);
    __decorate([
        aiMethod,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], Storage.prototype, "deleteRequest", null);
    Storage = __decorate([
        aiWithAsyncInit,
        __metadata("design:paramtypes", [Object])
    ], Storage);
    return Storage;
}());

var OfflineService = /** @class */ (function () {
    function OfflineService(_a) {
        var _this = this;
        var request = _a.request, storage = _a.storage, getCacheKey = _a.getCacheKey, serializer = _a.serializer;
        // ==================== Request functions ====================
        this.networkOnlyRequest = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var response, _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.request.apply(this, args)];
                        case 1:
                            response = _d.sent();
                            _a = {};
                            _b = [{}, response];
                            _c = {};
                            return [4 /*yield*/, this.serializer(response)];
                        case 2: return [2 /*return*/, (_a.response = __assign.apply(void 0, _b.concat([(_c.serialized = _d.sent(), _c)])), _a)];
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
                        return [4 /*yield*/, this.storage.getCacheItem(cacheKey)];
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
                        return [4 /*yield*/, this.storage.addCacheItem(cacheKey, data)];
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
                        return [4 /*yield*/, this.storage.getCacheItem(cacheKey)];
                    case 1:
                        _a = _b.sent(), exist = _a.exist, expired = _a.expired, rest = __rest(_a, ["exist", "expired"]);
                        if (!(exist && !expired)) return [3 /*break*/, 2];
                        return [2 /*return*/, CachingResult.NotUpdated];
                    case 2: return [4 /*yield*/, this.storage.addCacheItem(cacheKey, data)];
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
        this.request = request;
        //TODO: implement key extractor
        this.getCacheKey = getCacheKey;
        this.serializer = serializer;
        this.storage = storage;
    }
    OfflineService.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    OfflineService.prototype.receive = function (url, params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, refreshCacheStrategy, _b, requestCacheStrategy, restParams, _c, response, cacheStatus, error_3;
            var _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = params.refreshCacheStrategy, refreshCacheStrategy = _a === void 0 ? RefreshCacheStrategy.RefreshAlways : _a, _b = params.requestCacheStrategy, requestCacheStrategy = _b === void 0 ? RequestCacheStrategy.CacheFallingBackToNetwork : _b, restParams = __rest(params, ["refreshCacheStrategy", "requestCacheStrategy"]);
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 3, , 4]);
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
                            return [2 /*return*/, __assign({}, response ? { cached: this.mergeResponseWithCachedInfo(response, cacheStatus) } : {}, { network: this.receive(url, __assign({}, params, { requestCacheStrategy: RequestCacheStrategy.NetworkOnly })) })];
                        }
                        if (response.ok) {
                            try {
                                // We have not to wait cache update and we don't need the result of caching
                                // const cacheResult = await ({
                                ((_e = {},
                                    _e[RefreshCacheStrategy.NoStore] = function () { },
                                    _e[RefreshCacheStrategy.RefreshAlways] = this.refreshAlwaysCaching,
                                    _e[RefreshCacheStrategy.RefreshWhenExpired] = this.refreshWhenExpiredCaching,
                                    _e)[refreshCacheStrategy] || (function () { throw 'Unknown refresh cache strategy'; }))(url, restParams, response, cacheStatus);
                                return [2 /*return*/, this.mergeResponseWithCachedInfo(response, cacheStatus)];
                            }
                            catch (error) {
                                //TODO: provide error object
                                throw 'Caching has been failed';
                            }
                        }
                        else {
                            //TODO: to think about this case
                            throw response;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _f.sent();
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        aiInit,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], OfflineService.prototype, "init", null);
    __decorate([
        aiMethod,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], OfflineService.prototype, "receive", null);
    OfflineService = __decorate([
        aiWithAsyncInit,
        __metadata("design:paramtypes", [Object])
    ], OfflineService);
    return OfflineService;
}());

var PromiseStatus;
(function (PromiseStatus) {
    PromiseStatus["Pending"] = "pending";
    PromiseStatus["Fulfilled"] = "fulfilled";
    PromiseStatus["Rejected"] = "rejected";
})(PromiseStatus || (PromiseStatus = {}));
var RequestOperand = /** @class */ (function () {
    function RequestOperand(url, params, id) {
        var _this = this;
        this.createPromise = function () {
            var resolve, reject, status;
            return {
                promise: new Promise(function (res, rej) {
                    resolve = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return (status = status || PromiseStatus.Fulfilled, res.apply(void 0, args));
                    };
                    reject = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return (status = status || PromiseStatus.Rejected, rej.apply(void 0, args));
                    };
                }),
                resolve: resolve,
                reject: reject,
                get status() { return status || PromiseStatus.Pending; }
            };
        };
        this.rejectWithNetworkError = function () {
            if (_this.primary.status === PromiseStatus.Pending) {
                _this.secondary = _this.createPromise();
                _this.primary.reject({
                    error: 'network error',
                    promise: _this.secondary.promise
                });
            }
        };
        this.data = { url: url, params: params };
        this.primary = this.createPromise();
        this.id = id;
    }
    Object.defineProperty(RequestOperand.prototype, "isNetworkError", {
        get: function () {
            return this.primary.status === PromiseStatus.Rejected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestOperand.prototype, "primaryPromise", {
        get: function () {
            return this.primary.promise;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestOperand.prototype, "resolvePrimary", {
        get: function () {
            return this.primary.resolve;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestOperand.prototype, "resolveSecondary", {
        get: function () {
            return this.secondary && this.secondary.resolve;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestOperand.prototype, "resolve", {
        get: function () {
            return this.primary.status === PromiseStatus.Rejected ? this.secondary.resolve : this.primary.resolve;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestOperand.prototype, "reject", {
        get: function () {
            return this.primary.status === PromiseStatus.Rejected ? this.secondary.reject : this.primary.reject;
        },
        enumerable: true,
        configurable: true
    });
    return RequestOperand;
}());

var Sender = /** @class */ (function () {
    function Sender(_a) {
        var _this = this;
        var request = _a.request, storage = _a.storage, serializer = _a.serializer, _b = _a.requestTimeout, requestTimeout = _b === void 0 ? 30000 : _b;
        this.queue = [];
        this.connected = true;
        this.idle = true;
        this.process = false;
        this.deffered = {};
        this.runner = function (auto) {
            if (auto === void 0) { auto = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.queue.length) return [3 /*break*/, 4];
                            if (!(this.idle || auto)) return [3 /*break*/, 2];
                            this.idle = false;
                            return [4 /*yield*/, this.task(this.queue[0])];
                        case 1:
                            _a.sent();
                            this.queue.shift();
                            setTimeout(function () { return _this.runner(true); }, 0);
                            return [3 /*break*/, 3];
                        case 2:
                            if (this.process) ;
                            else {
                                //console.log('runDeffered')
                                this.runDeffered();
                            }
                            _a.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            this.idle = true;
                            this.process = false;
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        this.task = function (requestOperand) { return __awaiter(_this, void 0, void 0, function () {
            var _a, url, params, requestID;
            var _this = this;
            return __generator(this, function (_b) {
                _a = requestOperand.data, url = _a.url, params = _a.params;
                requestID = requestOperand.id;
                //console.log('task', requestOperand)
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var make;
                        var _this = this;
                        return __generator(this, function (_a) {
                            make = function (debugURL) {
                                if (debugURL === void 0) { debugURL = url; }
                                return __awaiter(_this, void 0, void 0, function () {
                                    var response, result, _a, _b, _c, error_1;
                                    return __generator(this, function (_d) {
                                        switch (_d.label) {
                                            case 0:
                                                this.process = true;
                                                _d.label = 1;
                                            case 1:
                                                _d.trys.push([1, 6, , 9]);
                                                return [4 /*yield*/, this.request(debugURL, params)];
                                            case 2:
                                                response = _d.sent();
                                                this.throwIfNetworkError(response);
                                                this.connected = true;
                                                _a = [{}, response];
                                                _b = {};
                                                return [4 /*yield*/, this.serializer(response)
                                                    //}
                                                ];
                                            case 3:
                                                result = __assign.apply(void 0, _a.concat([(_b.serialized = _d.sent(), _b)]));
                                                requestOperand.resolve(result);
                                                resolve(result);
                                                _c = requestID;
                                                if (!_c) return [3 /*break*/, 5];
                                                return [4 /*yield*/, this.storage.deleteRequest(requestID)];
                                            case 4:
                                                _c = (_d.sent());
                                                _d.label = 5;
                                            case 5:
                                                return [3 /*break*/, 9];
                                            case 6:
                                                error_1 = _d.sent();
                                                if (!(requestID === undefined)) return [3 /*break*/, 8];
                                                return [4 /*yield*/, this.storage.addRequest(requestOperand.data)];
                                            case 7:
                                                requestID = _d.sent();
                                                _d.label = 8;
                                            case 8:
                                                this.connected = false;
                                                //console.log(error)
                                                this.rejectAll();
                                                // this.createDeffered(() => make(debugURL - 1))
                                                this.createDeffered(function () { return make(debugURL); });
                                                this.process = false;
                                                return [3 /*break*/, 9];
                                            case 9: return [2 /*return*/];
                                        }
                                    });
                                });
                            };
                            return [2 /*return*/, make()];
                        });
                    }); })];
            });
        }); };
        this.throwIfNetworkError = function (response) { };
        this.rejectAll = function () { return _this.queue.forEach(function (ro) { return ro.rejectWithNetworkError(); }); };
        this.createDeffered = function (func) {
            if (_this.deffered && _this.deffered.timer) {
                clearTimeout(_this.deffered.timer);
                console.error('Overwrite old deferred!');
            }
            _this.deffered = { func: func, timer: setTimeout(_this.runDeffered, _this.requestTimeout) };
        };
        this.runDeffered = function () {
            if (_this.deffered && _this.deffered.func) {
                clearTimeout(_this.deffered.timer);
                var func = _this.deffered.func;
                _this.deffered = {};
                func();
            }
        };
        this.storage = storage;
        this.serializer = serializer;
        this.request = request;
        // ((ok = true) => new Promise((resolve, reject) => setTimeout(() => !ok ? resolve('OK') : reject('bad...'), 2000)))
        this.requestTimeout = requestTimeout;
    }
    // должна вызываться из приложения, когда сторадж будет готов, и произойдет инициализация пользователя. может быть вызван повторно при смене пользователя
    // повесить декоратор инициализации, т.к. нельзя вызывать какие-то публичные методы предварительно не загрузив старые неотправленные данные
    Sender.prototype.restoreRequestsFromStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var requests;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.getRequests()];
                    case 1:
                        requests = (_a.sent());
                        requests.forEach(function (_a) {
                            var id = _a.id, _b = _a.data, url = _b.url, params = _b.params;
                            var ro = new RequestOperand(url, params, id);
                            _this.queue.push(ro);
                        });
                        this.runner();
                        console.log('Sender init');
                        return [2 /*return*/];
                }
            });
        });
    };
    Sender.prototype.finalize = function () {
        this.queue.forEach(function (ro) { return ro.reject('Finalization'); });
    };
    Sender.prototype.send = function (url, params) {
        return __awaiter(this, void 0, void 0, function () {
            var ro, requestID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ro = new RequestOperand(url, params);
                        this.queue.push(ro);
                        if (!!this.idle) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.storage.addRequest(ro.data)];
                    case 1:
                        requestID = _a.sent();
                        ro.id = requestID;
                        if (!this.connected) {
                            ro.rejectWithNetworkError();
                        }
                        _a.label = 2;
                    case 2:
                        this.runner();
                        return [2 /*return*/, ro.primaryPromise];
                }
            });
        });
    };
    __decorate([
        aiInit,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Sender.prototype, "restoreRequestsFromStorage", null);
    __decorate([
        aiMethod,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Sender.prototype, "finalize", null);
    __decorate([
        aiMethod,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], Sender.prototype, "send", null);
    Sender = __decorate([
        aiWithAsyncInit,
        __metadata("design:paramtypes", [Object])
    ], Sender);
    return Sender;
}());

var OfflineService$1 = /** @class */ (function () {
    function OfflineService$1(_a) {
        var request = _a.request, storageAccessors = _a.storageAccessors, getCacheKey = _a.getCacheKey, serializer = _a.serializer;
        var storage = this.storage = new Storage(storageAccessors);
        this.sender = new Sender({ storage: storage, request: request, serializer: serializer, requestTimeout: 1000 });
        this.receiver = new OfflineService({ storage: storage, request: request, getCacheKey: getCacheKey, serializer: serializer });
    }
    OfflineService$1.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.init()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.sender.restoreRequestsFromStorage()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.receiver.init()
                            //console.log('Service init')
                        ];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OfflineService$1.prototype.request = function (url, params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, requestType, rest, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = params.requestType, requestType = _a === void 0 ? RequestTypes.DataReceiveRequest : _a, rest = __rest(params, ["requestType"]);
                        if (!(requestType === RequestTypes.DataSendRequest)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.sender.send(url, rest)];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.receiver.receive(url, rest)];
                    case 3:
                        _b = _c.sent();
                        _c.label = 4;
                    case 4: return [2 /*return*/, _b];
                }
            });
        });
    };
    __decorate([
        aiInit,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], OfflineService$1.prototype, "init", null);
    __decorate([
        aiMethod,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], OfflineService$1.prototype, "request", null);
    OfflineService$1 = __decorate([
        aiWithAsyncInit,
        __metadata("design:paramtypes", [Object])
    ], OfflineService$1);
    return OfflineService$1;
}());

export default OfflineService$1;
export { RefreshCacheStrategy, RequestCacheStrategy, RequestTypes };
//# sourceMappingURL=offline-service.js.map
