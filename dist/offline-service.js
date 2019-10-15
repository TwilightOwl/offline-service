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

var KEY = '_'; // '__offline__'
var REGISTRY_KEY = KEY + 'reg'; // 'registry'
var SENDER_RESPONSE_KEY = KEY + 's_'; // 'send__'
var FUTURE_OBJECT_QUOTE = '~*foq*~';
var FUTURE_ID_QUOTE = '*~fiq~*';
var USED_RESPONSES_REGISTRY_KEY = KEY + 'urr'; // 'used_responses_registry'
var NETWORK_ERROR = 'NetworkError';
var NETWORK_ERROR_STATUS = 2;
var SERVICE_ERROR = 'OfflineServiceError';
var SERVICE_ERROR_STATUS = 1;
// type RegistryKey1 = '__offline__registry'
// type RegistryKey = typeof REGISTRY_KEY
var RefreshCacheStrategy;
(function (RefreshCacheStrategy) {
    RefreshCacheStrategy["RefreshWhenExpired"] = "refresh-when-expired";
    RefreshCacheStrategy["RefreshAlways"] = "refresh-always";
    RefreshCacheStrategy["NoStore"] = "no-store";
})(RefreshCacheStrategy || (RefreshCacheStrategy = {}));
var RequestCacheStrategy;
(function (RequestCacheStrategy) {
    RequestCacheStrategy["CacheOnly"] = "cache-only";
    RequestCacheStrategy["NetworkOnly"] = "network-only";
    RequestCacheStrategy["CacheFallingBackToNetwork"] = "cache-falling-back-to-network";
    RequestCacheStrategy["NetworkFallingBackToCache"] = "network-falling-back-to-cache";
    RequestCacheStrategy["CacheThenNetwork"] = "cache-then-network";
})(RequestCacheStrategy || (RequestCacheStrategy = {}));
var RequestTypes;
(function (RequestTypes) {
    RequestTypes["DataSendRequest"] = "send";
    RequestTypes["DataReceiveRequest"] = "receive";
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
var LifecycleHandlerNames;
(function (LifecycleHandlerNames) {
    LifecycleHandlerNames["onSuccess"] = "onSuccess";
    LifecycleHandlerNames["onError"] = "onError";
    LifecycleHandlerNames["onLoading"] = "onLoading";
    LifecycleHandlerNames["onFinally"] = "onFinally";
})(LifecycleHandlerNames || (LifecycleHandlerNames = {}));
//TODO: export types from module

var Storage = /** @class */ (function () {
    function Storage(storage) {
        this.sequence = 0;
        this.registry = [];
        this.storage = storage;
        // this.init()
    }
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
                        console.log('Storage init');
                        return [4 /*yield*/, this.cleanOutdatedAndUnusedData()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Storage.prototype.cleanOutdatedAndUnusedData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 7]);
                        return [4 /*yield*/, this.cleanReceiverData()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Offline service: clean receiver data failure');
                        return [3 /*break*/, 7];
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.cleanSenderData()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.error('Offline service: clean sender data failure');
                        return [3 /*break*/, 6];
                    case 6: return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // These methods are for recievers (handling cache)
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

                }
            });
        });
    };
    Storage.prototype.cleanReceiverData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(Storage.prototype, "newID", {
        // These methods are for senders (handling deferred requests)
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
                    case 0: return [4 /*yield*/, this.storage.multiGet(this.registry.map(function (id) { return KEY + id; }))
                        // someone can clear storage, but registry and sequence store locally here. On next launch there will be null items
                    ];
                    case 1:
                        data = _a.sent();
                        // someone can clear storage, but registry and sequence store locally here. On next launch there will be null items
                        return [2 /*return*/, data.filter(function (x) { return x; })];
                }
            });
        });
    };
    Storage.prototype.deleteRequest = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.remove(KEY + id)];
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
    // These methods are for senders (handling future responses and who is using them)
    Storage.prototype.addResolvedResposne = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, error, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uid = data.uid, error = data.error, result = data.result;
                        return [4 /*yield*/, this.storage.set(SENDER_RESPONSE_KEY + uid, { uid: uid, error: error, result: result })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, uid];
                }
            });
        });
    };
    Storage.prototype.getUsedResponseRegistry = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usedResponseRegistry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(USED_RESPONSES_REGISTRY_KEY)];
                    case 1:
                        usedResponseRegistry = ((_a.sent()) || {});
                        return [2 /*return*/, usedResponseRegistry];
                }
            });
        });
    };
    // @aiMethod
    // public async getUsedResponseRegistry() {
    //   return this._getUsedResponseRegistry();
    // }
    Storage.prototype.setUsedResponseRegistry = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.set(USED_RESPONSES_REGISTRY_KEY, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Storage.prototype.addToUsedResponseRegistry = function (requesterUID, usedUIDs) {
        return __awaiter(this, void 0, void 0, function () {
            var usedResponseRegistry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUsedResponseRegistry()];
                    case 1:
                        usedResponseRegistry = _a.sent();
                        usedResponseRegistry[requesterUID] = usedUIDs;
                        return [2 /*return*/, this.setUsedResponseRegistry(usedResponseRegistry)];
                }
            });
        });
    };
    Storage.prototype.removeFromUsedResponseRegistry = function (requesterUID) {
        return __awaiter(this, void 0, void 0, function () {
            var usedResponseRegistry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUsedResponseRegistry()];
                    case 1:
                        usedResponseRegistry = _a.sent();
                        delete usedResponseRegistry[requesterUID];
                        return [2 /*return*/, this.setUsedResponseRegistry(usedResponseRegistry)];
                }
            });
        });
    };
    Storage.prototype.getResolvedResponses = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            var usedResponseRegistry, usedResponseUIDs, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUsedResponseRegistry()];
                    case 1:
                        usedResponseRegistry = _a.sent();
                        usedResponseUIDs = usedResponseRegistry[uid] || [];
                        return [4 /*yield*/, Promise.all(usedResponseUIDs
                                .map(function (usedUID) { return _this.storage.get(SENDER_RESPONSE_KEY + usedUID); }))];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Storage.prototype.cleanSenderData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usedResponseRegistry, used, keys, unusedKeys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUsedResponseRegistry()];
                    case 1:
                        usedResponseRegistry = _a.sent();
                        used = Object.keys(usedResponseRegistry)
                            .reduce(function (acc, key) { return acc.concat([key], (usedResponseRegistry[key] || [])); }, []);
                        return [4 /*yield*/, this.storage.getAllKeys()];
                    case 2:
                        keys = _a.sent();
                        unusedKeys = keys.filter(function (key) {
                            return key.substr(0, SENDER_RESPONSE_KEY.length) === SENDER_RESPONSE_KEY
                                && !used.includes(key.substr(SENDER_RESPONSE_KEY.length));
                        });
                        return [4 /*yield*/, this.storage.multiRemove(unusedKeys)];
                    case 3:
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
    __decorate([
        aiMethod,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], Storage.prototype, "addResolvedResposne", null);
    __decorate([
        aiMethod,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], Storage.prototype, "setUsedResponseRegistry", null);
    __decorate([
        aiMethod,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Array]),
        __metadata("design:returntype", Promise)
    ], Storage.prototype, "addToUsedResponseRegistry", null);
    __decorate([
        aiMethod,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], Storage.prototype, "removeFromUsedResponseRegistry", null);
    __decorate([
        aiMethod,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], Storage.prototype, "getResolvedResponses", null);
    Storage = __decorate([
        aiWithAsyncInit,
        __metadata("design:paramtypes", [Object])
    ], Storage);
    return Storage;
}());

var OfflineService = /** @class */ (function () {
    function OfflineService(_a) {
        var _this = this;
        var request = _a.request, storage = _a.storage, getCacheKey = _a.getCacheKey, requestHandler = _a.requestHandler, createError = _a.createError, defaultParameters = _a.defaultParameters;
        this.createServiceError = function (message) { return _this.createError({
            name: SERVICE_ERROR,
            message: message,
            status: SERVICE_ERROR_STATUS
        }); };
        // ==================== Request functions ====================
        this.networkOnlyRequest = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, onSuccess, _c, onLoading, _d, onError, _e, restParams, response, error_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = params || {}, _b = _a.onSuccess, onSuccess = _b === void 0 ? undefined : _b, _c = _a.onLoading, onLoading = _c === void 0 ? undefined : _c, _d = _a.onError, onError = _d === void 0 ? undefined : _d, _e = _a.onFinally, restParams = __rest(_a, ["onSuccess", "onLoading", "onError", "onFinally"]);
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 3, 4, 5]);
                        onLoading && onLoading({ loading: true, network: true });
                        return [4 /*yield*/, this.requestHandler({
                                throwNetworkError: function () { throw NETWORK_ERROR; },
                                requestPromise: this.request(url, restParams)
                            })];
                    case 2:
                        response = _f.sent();
                        onSuccess && onSuccess(response);
                        return [2 /*return*/, { response: response }];
                    case 3:
                        error_1 = _f.sent();
                        onError && onError(error_1 === NETWORK_ERROR
                            ? this.createError({
                                name: NETWORK_ERROR,
                                message: 'Network request has failed',
                                status: NETWORK_ERROR_STATUS,
                                isNetworkError: true
                            })
                            : __assign({}, error_1, { isNetworkError: false }));
                        throw error_1;
                    case 4:
                        onLoading && onLoading({ loading: false, network: true });
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.cacheOnlyRequest = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, onSuccess, _c, onLoading, _d, onError, _e, restParams, cacheKey, _f, exist, expired, data, result, error;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = params || {}, _b = _a.onSuccess, onSuccess = _b === void 0 ? undefined : _b, _c = _a.onLoading, onLoading = _c === void 0 ? undefined : _c, _d = _a.onError, onError = _d === void 0 ? undefined : _d, _e = _a.onFinally, restParams = __rest(_a, ["onSuccess", "onLoading", "onError", "onFinally"]);
                        onLoading && onLoading({ loading: true, network: false });
                        cacheKey = this.getCacheKey(url, restParams);
                        return [4 /*yield*/, this.storage.getCacheItem(cacheKey)];
                    case 1:
                        _f = _g.sent(), exist = _f.exist, expired = _f.expired, data = _f.data;
                        onLoading && onLoading({ loading: false, network: false });
                        if (exist) {
                            result = { response: data, cacheStatus: expired ? CacheStatus.Expired : CacheStatus.Unexpired };
                            onSuccess && onSuccess(this.mergeResponseWithCachedInfo(result.response, result.cacheStatus));
                            return [2 /*return*/, result];
                        }
                        else {
                            error = this.createServiceError("The requested data doesn't exist in the cache");
                            onError && onError(__assign({}, error, { isNetworkError: false }));
                            throw error;
                        }

                }
            });
        }); };
        this.networkFallingBackToCacheRequest = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            var error_2, cacheError_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 7]);
                        return [4 /*yield*/, this.networkOnlyRequest(url, params)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.cacheOnlyRequest(url, params)];
                    case 4: 
                    // without "await" catch block will not handle exception!
                    return [2 /*return*/, _a.sent()];
                    case 5:
                        cacheError_1 = _a.sent();
                        throw this.createServiceError("The network request has been failed but cached data doesn't exist");
                    case 6: return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.cacheFallingBackToNetworkRequest = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            var _a, response, cacheStatus, cacheError_2, error_3;
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

                    case 2:
                        cacheError_2 = _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.networkOnlyRequest(url, params)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5:
                        error_3 = _b.sent();
                        // without "await" catch block will not handle exception!
                        throw this.createServiceError("The cache doesn't exist or expired but network request has been faild");
                    case 6: return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        // It's just a first part of algorythm, in the "request" method a second part will be invoked 
        //   by recursive call of "request" with NetworkOnly strategy
        this.cacheThenNetworkRequest = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.cacheOnlyRequest(url, params)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, { cacheStatus: CacheStatus.DoesNotExist }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // ==================== Caching functions ====================
        this.refreshAlwaysCaching = function (url, params, data, cacheStatus, ttl) { return __awaiter(_this, void 0, void 0, function () {
            var cacheKey, error_5;
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
                        return [4 /*yield*/, this.storage.addCacheItem(cacheKey, data, ttl)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, CachingResult.HasBeenUpdated];
                    case 3:
                        error_5 = _a.sent();
                        throw error_5;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.refreshWhenExpiredCaching = function (url, params, data, cacheStatus, ttl) { return __awaiter(_this, void 0, void 0, function () {
            var cacheKey, _a, exist, expired;
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
                        _a = _b.sent(), exist = _a.exist, expired = _a.expired;
                        if (!(exist && !expired)) return [3 /*break*/, 2];
                        return [2 /*return*/, CachingResult.NotUpdated];
                    case 2: return [4 /*yield*/, this.storage.addCacheItem(cacheKey, data, ttl)];
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
        this.requestHandler = requestHandler;
        this.createError = createError;
        this.storage = storage;
        this.defaultParameters = defaultParameters;
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
            var _a, refreshCacheStrategy, requestCacheStrategy, ttl, restParams, isFinal, _b, response, cacheStatus, error_6;
            var _c, _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = __assign({}, this.defaultParameters, params), refreshCacheStrategy = _a.refreshCacheStrategy, requestCacheStrategy = _a.requestCacheStrategy, ttl = _a.ttl, restParams = __rest(_a, ["refreshCacheStrategy", "requestCacheStrategy", "ttl"]);
                        isFinal = true;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, ((_c = {},
                                _c[RequestCacheStrategy.NetworkOnly] = this.networkOnlyRequest,
                                _c[RequestCacheStrategy.CacheOnly] = this.cacheOnlyRequest,
                                _c[RequestCacheStrategy.NetworkFallingBackToCache] = this.networkFallingBackToCacheRequest,
                                _c[RequestCacheStrategy.CacheFallingBackToNetwork] = this.cacheFallingBackToNetworkRequest,
                                _c[RequestCacheStrategy.CacheThenNetwork] = this.cacheThenNetworkRequest,
                                _c)[requestCacheStrategy] || (function () { throw _this.createServiceError('Unknown request cache strategy'); }))(url, restParams)];
                    case 2:
                        _b = _e.sent(), response = _b.response, cacheStatus = _b.cacheStatus;
                        if (requestCacheStrategy === RequestCacheStrategy.CacheThenNetwork) {
                            isFinal = false;
                            return [2 /*return*/, __assign({}, response ? { cached: this.mergeResponseWithCachedInfo(response, cacheStatus) } : {}, { network: this.receive(url, __assign({}, params, { requestCacheStrategy: RequestCacheStrategy.NetworkOnly })) })];
                        }
                        try {
                            // We have not to wait cache update and we don't need the result of caching
                            // const cacheResult = await ({
                            ((_d = {},
                                _d[RefreshCacheStrategy.NoStore] = function () { },
                                _d[RefreshCacheStrategy.RefreshAlways] = this.refreshAlwaysCaching,
                                _d[RefreshCacheStrategy.RefreshWhenExpired] = this.refreshWhenExpiredCaching,
                                _d)[refreshCacheStrategy] || (function () { throw 'Unknown refresh cache strategy'; }))(url, restParams, response, cacheStatus, ttl);
                            return [2 /*return*/, this.mergeResponseWithCachedInfo(response, cacheStatus)];
                        }
                        catch (error) {
                            throw this.createServiceError('Caching has been failed');
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        error_6 = _e.sent();
                        if (!(restParams || {}).onError) {
                            throw error_6;
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        isFinal && (restParams || {}).onFinally && restParams.onFinally();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
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
    OfflineService = __decorate([
        aiWithAsyncInit,
        __metadata("design:paramtypes", [Object])
    ], OfflineService);
    return OfflineService;
}());

var _a;
var escape = function (str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};
var getEncoder = function (qt, idqt) { return ({
    encoder: function (id) { return (function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        return "" + qt + idqt + id + idqt + [''].concat(keys).join('.') + qt;
    }); },
    getDecodedIDs: function () {
        var encodeds = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            encodeds[_i] = arguments[_i];
        }
        return encodeds
            .reduce(function (acc, encoded) {
            try {
                if (!encoded)
                    return acc;
                var serialized = JSON.stringify(encoded);
                var regex_1 = "" + escape(qt) + escape(idqt) + "(.*?)" + escape(idqt);
                var result = (serialized
                    .match(RegExp(regex_1, 'g')) || [])
                    .map(function (x) { return (x.match(RegExp(regex_1)) || [])[1]; });
                return acc.concat(result);
            }
            catch (error) {
                // Actually there shouldn't be any errors here
            }
        }, [])
            .filter(function (value, index, list) { return list.indexOf(value) === index; });
    },
    decoder: function (id, value) { return (function (encoded) {
        var removeFirstQuote = function (str) { return str[0] === '"'
            ? { result: str.substr(1), removed: true }
            : { result: str }; };
        var removeLastQuote = function (str) { return str[str.length - 1] === '"'
            ? { result: str.substr(0, str.length - 1), removed: true }
            : { result: str }; };
        var replace = function (data) {
            var result = data.match(RegExp("" + escape(qt) + escape(idqt) + escape(id) + escape(idqt) + "(.*?)" + escape(qt)));
            if (result) {
                var found = result[0], keys = result[1], start = result.index;
                if (start === undefined) {
                    throw 'Start is undefined, check replace method in decoder';
                }
                var actualValue = void 0;
                try {
                    actualValue = keys.split('.').filter(function (x) { return x.trim(); })
                        .reduce(function (acc, key) {
                        if (key in acc) {
                            return acc[key];
                        }
                        else {
                            throw "Key " + key + " doesn't exist in target object";
                        }
                    }, value);
                }
                catch (error) {
                    throw "Retrieve resolved response value error";
                }
                var _a = removeLastQuote(data.substr(0, start)), head = _a.result, removed = _a.removed;
                var first = head +
                    (removed ? JSON.stringify(actualValue) : JSON.stringify(actualValue).replace(/\"/g, '\\"'));
                return first + removeFirstQuote(replace(data.substr(start + found.length))).result;
            }
            return data;
        };
        try {
            var serialized = JSON.stringify(encoded);
            var result = replace(serialized);
            return JSON.parse(result);
        }
        catch (error) {
            throw error;
        }
    }); }
}); };
var encoder = (_a = getEncoder(FUTURE_OBJECT_QUOTE, FUTURE_ID_QUOTE), _a.encoder), decoder = _a.decoder, getDecodedIDs = _a.getDecodedIDs;

var PromiseStatus;
(function (PromiseStatus) {
    PromiseStatus["Pending"] = "pending";
    PromiseStatus["Fulfilled"] = "fulfilled";
    PromiseStatus["Rejected"] = "rejected";
})(PromiseStatus || (PromiseStatus = {}));
var RequestOperand = /** @class */ (function () {
    function RequestOperand(url, params, id, uid) {
        var _this = this;
        this.launch = function (handlerName, arg) {
            if (_this.data.params[handlerName]) {
                try {
                    console.log('* * * HANDLERS * * *', handlerName, arg);
                    _this.data.params[handlerName](arg);
                }
                catch (error) { }
                return true;
            }
        };
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
        this.rejectWithNetworkError = function (createError) {
            if (_this.primary.status === PromiseStatus.Pending) {
                _this.secondary = _this.createPromise();
                _this.secondary.promise = _this.secondary.promise
                    .then(function (data) {
                    _this.launch(LifecycleHandlerNames.onSuccess, __assign({}, data, { deferred: true }));
                    _this.launch(LifecycleHandlerNames.onLoading, { loading: false, deferred: true });
                    _this.launch(LifecycleHandlerNames.onFinally, _this.data.uid);
                    return __assign({}, data, { deferred: true });
                }).catch(function (error) {
                    _this.launch(LifecycleHandlerNames.onLoading, { loading: false, deferred: true });
                    if (!_this.launch(LifecycleHandlerNames.onError, __assign({}, error, { isNetworkError: false }))) {
                        _this.launch(LifecycleHandlerNames.onFinally, _this.data.uid);
                        throw __assign({}, error, { isNetworkError: false });
                    }
                    else {
                        _this.launch(LifecycleHandlerNames.onFinally, _this.data.uid);
                    }
                });
                _this.primary.reject(createError({
                    name: NETWORK_ERROR,
                    message: 'Network request has failed',
                    status: NETWORK_ERROR_STATUS,
                    promise: _this.secondary.promise
                }));
            }
        };
        this.data = {
            url: url,
            params: params,
            uid: uid || (Date.now() + '-' + Math.random())
        };
        this.primary = this.createPromise();
        this.id = id;
        this.launch(LifecycleHandlerNames.onLoading, { loading: true, deferred: false });
        this.primary.promise = this.primary.promise
            .then(function (data) {
            _this.launch(LifecycleHandlerNames.onSuccess, __assign({}, data, { deferred: false }));
            _this.launch(LifecycleHandlerNames.onLoading, { loading: false, deferred: false });
            _this.launch(LifecycleHandlerNames.onFinally, _this.data.uid);
            return __assign({}, data, { deferred: false });
        }).catch(function (error) {
            _this.launch(LifecycleHandlerNames.onLoading, { loading: false, deferred: false });
            var isNetworkError = error.name === NETWORK_ERROR;
            if (!_this.launch(LifecycleHandlerNames.onError, __assign({}, error, { isNetworkError: isNetworkError, getFutureResponse: encoder(_this.data.uid) }))) {
                isNetworkError ? _this.launch(LifecycleHandlerNames.onLoading, { loading: true, deferred: true }) : _this.launch(LifecycleHandlerNames.onFinally, _this.data.uid);
                throw __assign({}, error, { isNetworkError: isNetworkError });
            }
            else {
                isNetworkError ? _this.launch(LifecycleHandlerNames.onLoading, { loading: true, deferred: true }) : _this.launch(LifecycleHandlerNames.onFinally, _this.data.uid);
            }
        });
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
        var request = _a.request, storage = _a.storage, requestHandler = _a.requestHandler, createError = _a.createError, defaultParameters = _a.defaultParameters;
        this.queue = [];
        this.connected = true;
        this.idle = true;
        this.process = false;
        this.deferred = {};
        this.createServiceError = function (message) { return _this.createError({
            name: SERVICE_ERROR,
            message: message,
            status: SERVICE_ERROR_STATUS
        }); };
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
                            if (!this.process) {
                                this.runDeferred();
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
            var _a, url, params, uid, _b, requestTimeout, onSuccess, onLoading, onError, onFinally, restParams;
            var _this = this;
            return __generator(this, function (_c) {
                _a = requestOperand.data, url = _a.url, params = _a.params, uid = _a.uid;
                _b = __assign({}, this.defaultParameters, params), requestTimeout = _b.requestTimeout, onSuccess = _b.onSuccess, onLoading = _b.onLoading, onError = _b.onError, onFinally = _b.onFinally, restParams = __rest(_b, ["requestTimeout", "onSuccess", "onLoading", "onError", "onFinally"]);
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var make;
                        var _this = this;
                        return __generator(this, function (_a) {
                            make = function () { return __awaiter(_this, void 0, void 0, function () {
                                var result, error, resolvedResponses, decoded, e_1, _a, error_1, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            this.process = true;
                                            _c.label = 1;
                                        case 1:
                                            _c.trys.push([1, 9, , 12]);
                                            result = void 0, error = void 0;
                                            _c.label = 2;
                                        case 2:
                                            _c.trys.push([2, 5, , 6]);
                                            return [4 /*yield*/, this.storage.getResolvedResponses(uid)];
                                        case 3:
                                            resolvedResponses = _c.sent();
                                            decoded = void 0;
                                            try {
                                                decoded = (resolvedResponses || []).reduce(function (_a, _b) {
                                                    var url = _a.url, restParams = _a.restParams;
                                                    var uid = _b.uid, result = _b.result, error = _b.error;
                                                    return ({
                                                        url: decoder(uid, result)(url),
                                                        restParams: decoder(uid, result)(restParams)
                                                    });
                                                }, { url: url, restParams: restParams });
                                            }
                                            catch (error) {
                                                throw this.createServiceError(error);
                                            }
                                            return [4 /*yield*/, this.requestHandler({
                                                    throwNetworkError: function () { throw NETWORK_ERROR; },
                                                    requestPromise: this.request(decoded.url, decoded.restParams)
                                                })];
                                        case 4:
                                            result = _c.sent();
                                            return [3 /*break*/, 6];
                                        case 5:
                                            e_1 = _c.sent();
                                            if (e_1 === NETWORK_ERROR) {
                                                throw e_1;
                                            }
                                            else {
                                                error = e_1;
                                            }
                                            return [3 /*break*/, 6];
                                        case 6:
                                            this.connected = true;
                                            // save result only if it was deferred promise. if it's primary promise no one used encoded response
                                            if (requestOperand.isNetworkError) {
                                                this.storage.addResolvedResposne(__assign({ uid: uid }, error ? { error: error } : { result: result }));
                                            }
                                            error ? requestOperand.reject(error) : requestOperand.resolve(result);
                                            // this is just resolving of inner promise (task)
                                            resolve();
                                            _a = requestOperand.id;
                                            if (!_a) return [3 /*break*/, 8];
                                            return [4 /*yield*/, this.storage.deleteRequest(requestOperand.id)];
                                        case 7:
                                            _a = (_c.sent());
                                            _c.label = 8;
                                        case 8:
                                            return [3 /*break*/, 12];
                                        case 9:
                                            error_1 = _c.sent();
                                            if (!(requestOperand.id === undefined)) return [3 /*break*/, 11];
                                            _b = requestOperand;
                                            return [4 /*yield*/, this.storage.addRequest(requestOperand.data)];
                                        case 10:
                                            _b.id = _c.sent();
                                            _c.label = 11;
                                        case 11:
                                            this.connected = false;
                                            this.rejectAll();
                                            this.createDeferred(make, requestTimeout);
                                            this.process = false;
                                            return [3 /*break*/, 12];
                                        case 12: return [2 /*return*/];
                                    }
                                });
                            }); };
                            return [2 /*return*/, make()];
                        });
                    }); })];
            });
        }); };
        this.rejectAll = function () { return _this.queue.forEach(function (ro) { return ro.rejectWithNetworkError(_this.createError); }); };
        this.createDeferred = function (func, requestTimeout) {
            if (_this.deferred && _this.deferred.timer) {
                clearTimeout(_this.deferred.timer);
                console.error('Overwrite old deferred!');
            }
            _this.deferred = { func: func, timer: setTimeout(_this.runDeferred, requestTimeout) };
        };
        this.runDeferred = function () {
            if (_this.deferred && _this.deferred.func) {
                clearTimeout(_this.deferred.timer);
                var func = _this.deferred.func;
                _this.deferred = {};
                func();
            }
        };
        this.storage = storage;
        this.request = request;
        this.requestHandler = requestHandler;
        this.createError = createError;
        this.defaultParameters = defaultParameters;
    }
    // должна вызываться из приложения, когда сторадж будет готов, и произойдет инициализация пользователя. 
    // может быть вызван повторно при смене пользователя повесить декоратор инициализации, т.к. нельзя вызывать 
    // какие-то публичные методы предварительно не загрузив старые неотправленные данные
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
                            var id = _a.id, _b = _a.data, url = _b.url, params = _b.params, uid = _b.uid;
                            var ro = new RequestOperand(url, __assign({}, params, { 
                                // this empty handler to omit unhandled promise rejection. It's empty because there are no original caller's (it was on previous app session)
                                onError: function () { }, onFinally: function (uid) { return _this.storage.removeFromUsedResponseRegistry(uid); } }), id, uid);
                            _this.queue.push(ro);
                        });
                        this.rejectAll();
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
            var _a, _b, _c, _d, _e, _f, onFinally, restParams, ro, requesterUID, usedUIDs, requestID;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = params || {}, _b = _a.requestTimeout, _c = _a.onSuccess, _d = _a.onLoading, _e = _a.onError, _f = _a.onFinally, onFinally = _f === void 0 ? undefined : _f, restParams = __rest(_a, ["requestTimeout", "onSuccess", "onLoading", "onError", "onFinally"]);
                        ro = new RequestOperand(url, __assign({}, params, { onFinally: function (uid) {
                                _this.storage.removeFromUsedResponseRegistry(uid);
                                onFinally && onFinally();
                            } }));
                        this.queue.push(ro);
                        requesterUID = ro.data.uid;
                        usedUIDs = getDecodedIDs(url, restParams);
                        if (usedUIDs && usedUIDs.length) {
                            this.storage.addToUsedResponseRegistry(requesterUID, usedUIDs);
                        }
                        if (!!this.idle) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.storage.addRequest(ro.data)];
                    case 1:
                        requestID = _g.sent();
                        ro.id = requestID;
                        if (!this.connected) {
                            ro.rejectWithNetworkError(this.createError);
                        }
                        _g.label = 2;
                    case 2:
                        // TODO: доделать исправление типов в sender, request-operand и т.п. 
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
        var request = _a.request, storageAccessors = _a.storageAccessors, getCacheKey = _a.getCacheKey, defaultParameters = _a.defaultParameters, requestHandler = _a.requestHandler, createError = _a.createError;
        var storage = this.storage = new Storage(storageAccessors);
        var requestTimeout = ((defaultParameters || {}).send || { requestTimeout: 10000 }).requestTimeout;
        var _b = (defaultParameters || {}).receive || {
            refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways,
            requestCacheStrategy: RequestCacheStrategy.CacheFallingBackToNetwork,
            ttl: 10000
        }, refreshCacheStrategy = _b.refreshCacheStrategy, requestCacheStrategy = _b.requestCacheStrategy, ttl = _b.ttl;
        this.sender = new Sender({ storage: storage, request: request, requestHandler: requestHandler, createError: createError,
            defaultParameters: { requestTimeout: requestTimeout }
        });
        this.receiver = new OfflineService({ storage: storage, request: request, getCacheKey: getCacheKey, requestHandler: requestHandler, createError: createError,
            defaultParameters: { refreshCacheStrategy: refreshCacheStrategy, requestCacheStrategy: requestCacheStrategy, ttl: ttl }
        });
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
                        return [4 /*yield*/, this.receiver.init()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OfflineService$1.prototype.finalize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sender.finalize()];
                    case 1:
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
