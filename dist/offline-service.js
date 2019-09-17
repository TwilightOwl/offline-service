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
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter$1(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator$1(thisArg, body) {
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

var _this = undefined;
var queues = {};
var getQueue = function (queueId) { return queues[queueId] || (queues[queueId] = {
    tasks: [],
    meta: {
        isTaskRejected: false,
        isTaskRejectedInNotEmptyQueue: false
    }
}); };
var showLog = false;
var log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return showLog && console.log.apply(console, args);
};
var OnRejection;
(function (OnRejection) {
    OnRejection["RejectAllInQueue"] = "rejectAllInQueue";
    OnRejection["RejectAlways"] = "rejectAlways";
    OnRejection["None"] = "none";
})(OnRejection || (OnRejection = {}));
var queue = (function (queueId, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.onIsQueueProcessing, onIsQueueProcessing = _c === void 0 ? function (isProcessing) { } : _c, _d = _b.onRejection, onRejection = _d === void 0 ? OnRejection.None : _d;
    return function (process, tag) {
        if (tag === void 0) { tag = ''; }
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new Promise(function (resolve, reject) {
                var _a = getQueue(queueId), tasks = _a.tasks, meta = _a.meta;
                var idle = !tasks.length;
                log("\n:: " + queueId + " :: CALL :: " + tag + " :: Queue: " + tasks);
                tasks.push({ process: function () { return process.apply(void 0, args); }, tag: tag, resolve: resolve, reject: reject });
                var doNext = function () { return __awaiter$1(_this, void 0, void 0, function () {
                    var _a, process, tag, resolve, reject, _b, error_1;
                    return __generator$1(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!tasks.length)
                                    return [2 /*return*/];
                                _a = tasks[0], process = _a.process, tag = _a.tag, resolve = _a.resolve, reject = _a.reject;
                                log(":: " + queueId + " :: BEGIN :: " + tag);
                                if (!(onRejection === OnRejection.RejectAlways && meta.isTaskRejected ||
                                    onRejection === OnRejection.RejectAllInQueue && meta.isTaskRejectedInNotEmptyQueue)) return [3 /*break*/, 1];
                                reject("One of previous task in queue \"" + queueId + "\" was rejected");
                                return [3 /*break*/, 4];
                            case 1:
                                _c.trys.push([1, 3, , 4]);
                                _b = resolve;
                                return [4 /*yield*/, process()];
                            case 2:
                                _b.apply(void 0, [_c.sent()]);
                                return [3 /*break*/, 4];
                            case 3:
                                error_1 = _c.sent();
                                meta.isTaskRejected = true;
                                meta.isTaskRejectedInNotEmptyQueue = true;
                                reject(error_1);
                                return [3 /*break*/, 4];
                            case 4:
                                tasks.shift();
                                log(":: " + queueId + " :: END :: " + tag + "\n");
                                if (tasks.length) {
                                    setTimeout(doNext, 0);
                                }
                                else {
                                    meta.isTaskRejectedInNotEmptyQueue = false;
                                    onIsQueueProcessing(false);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                if (idle) {
                    onIsQueueProcessing(true);
                    doNext();
                }
                else {
                    log(":: " + queueId + " :: Waiting... :: " + tag);
                }
            });
        };
    };
});

// TODO: make function version without decorators
// TODO: make the queue when init decorator have been applied, 
//    if method is called without init decorator at all, throw "you should apply init"
//    if method is called just before decorated init function, throw "you should call initialize function before any @method functions"
// TODO: unit tests
// TODO: think about reinitialization, how should it work?
var generateQueue = function (name) { return queue(name + "-" + Date.now() + "-" + Math.random(), {
    onIsQueueProcessing: function (isProcessing) { },
    onRejection: OnRejection.RejectAlways
}); };
var initialComplete = function () {
    throw 'Call complete before initialization';
};
var generateInitialPromise = function (target) { return target.__queue(function () { return new Promise(function (resolve, reject) {
    target.__complete = function (ok) {
        target.__init = ok;
        (ok ? resolve : reject)();
    };
}); }); };
var aiWithAsyncInit = function (constructor) {
    var Wrapper = /** @class */ (function (_super) {
        __extends(Wrapper, _super);
        function Wrapper() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this.__queue = generateQueue('QUEUE-INSTANCE');
            _this.__complete = initialComplete;
            _this.__init = false;
            _this.__initPromise = generateInitialPromise(_this);
            _this.__initPromise().catch(function () { });
            return _this;
        }
        /**
          We should use unique keys for static fields, like this:
          ```
            const _queue = Symbol('queue');
    
            class Wrapper extends constructor {
              static [_queue] = ...
            }
          ```
          But TS crashes, see https://github.com/microsoft/TypeScript/issues/23736
        */
        Wrapper.__queue = generateQueue('QUEUE');
        Wrapper.__complete = initialComplete;
        Wrapper.__init = false;
        Wrapper.__initPromise = generateInitialPromise(Wrapper);
        Wrapper._ = Wrapper.__initPromise().catch(function () { });
        return Wrapper;
    }(constructor));
    return Wrapper;
};
var aiInit = function (target, key, value) { return ({
    //@ts-ignore
    value: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter$1(this, void 0, void 0, function () {
            var isStatic, object, result, _a, error_1;
            return __generator$1(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        isStatic = !this.constructor.__initPromise;
                        object = this;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        if (!value.initializer) return [3 /*break*/, 3];
                        return [4 /*yield*/, value.initializer.apply(this).apply(void 0, args)];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, value.value.apply(this, args)];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        result = _a;
                        object.__complete(true);
                        return [2 /*return*/, result];
                    case 6:
                        error_1 = _b.sent();
                        object.__complete(false);
                        throw error_1;
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
}); };
var aiMethod = function (target, key, value) { return ({
    //@ts-ignore
    value: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter$1(this, void 0, void 0, function () {
            var func, wrapped, unwrap, isStatic, object, _a, _b;
            var _this = this;
            return __generator$1(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        func = function () { return value.initializer
                            ? value.initializer.apply(_this).apply(void 0, args) : value.value.apply(_this, args); };
                        wrapped = function () { return Promise
                            .resolve(func())
                            .then(function (result) { return ({ ok: true, result: result }); })
                            .catch(function (result) { return ({ ok: false, result: result }); }); };
                        unwrap = function (_a) {
                            var _b = _a.ok, ok = _b === void 0 ? true : _b, _c = _a.result, result = _c === void 0 ? undefined : _c;
                            return ok
                                ? Promise.resolve(result)
                                : Promise.reject(result);
                        };
                        isStatic = !this.constructor.__initPromise;
                        object = this;
                        if (!object.__init) return [3 /*break*/, 2];
                        return [4 /*yield*/, func()];
                    case 1:
                        _a = _c.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        _b = unwrap;
                        return [4 /*yield*/, object.__queue(wrapped)()];
                    case 3:
                        _a = _b.apply(void 0, [_c.sent()]);
                        _c.label = 4;
                    case 4: // isStatic ? this : this.constructor;
                    return [2 /*return*/, _a];
                }
            });
        });
    }
}); };

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
            return this.secondary.resolve;
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

var KEY = '__offline__';
var REGISTRY_KEY = KEY + 'registry';
var Storage = /** @class */ (function () {
    function Storage(storage) {
        this.sequence = 0;
        this.registry = [];
        this.storage = storage;
        this.init();
    }
    Storage.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(REGISTRY_KEY)];
                    case 1:
                        data = _a.sent();
                        this.registry = data ? data : [];
                        this.sequence = this.registry.length ? this.registry[this.registry.length - 1] : 0;
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
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], Storage.prototype, "deleteRequest", null);
    Storage = __decorate([
        aiWithAsyncInit,
        __metadata("design:paramtypes", [Object])
    ], Storage);
    return Storage;
}());

var Sender = /** @class */ (function () {
    function Sender(_a) {
        var _this = this;
        var request = _a.request, storage = _a.storage;
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
                            if (this.process) {
                                console.log('Nothing');
                            }
                            else {
                                console.log('runDeffered');
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
                console.log('task', requestOperand);
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var make;
                        var _this = this;
                        return __generator(this, function (_a) {
                            make = function (debugURL) {
                                if (debugURL === void 0) { debugURL = url; }
                                return __awaiter(_this, void 0, void 0, function () {
                                    var response, _a, error_1;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                this.process = true;
                                                _b.label = 1;
                                            case 1:
                                                _b.trys.push([1, 5, , 8]);
                                                return [4 /*yield*/, this.request(debugURL, params)];
                                            case 2:
                                                response = _b.sent();
                                                this.throwIfNetworkError(response);
                                                this.connected = true;
                                                requestOperand.resolve(response);
                                                resolve(response);
                                                _a = requestID;
                                                if (!_a) return [3 /*break*/, 4];
                                                return [4 /*yield*/, this.storage.deleteRequest(requestID)];
                                            case 3:
                                                _a = (_b.sent());
                                                _b.label = 4;
                                            case 4:
                                                return [3 /*break*/, 8];
                                            case 5:
                                                error_1 = _b.sent();
                                                if (!(requestID === undefined)) return [3 /*break*/, 7];
                                                return [4 /*yield*/, this.storage.addRequest(requestOperand.data)];
                                            case 6:
                                                requestID = _b.sent();
                                                _b.label = 7;
                                            case 7:
                                                this.connected = false;
                                                console.log(error_1);
                                                this.rejectAll();
                                                this.createDeffered(function () { return make(debugURL - 1); });
                                                this.process = false;
                                                return [3 /*break*/, 8];
                                            case 8: return [2 /*return*/];
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
            _this.deffered = { func: func, timer: setTimeout(_this.runDeffered, 1000) };
        };
        this.runDeffered = function () {
            if (_this.deffered && _this.deffered.func) {
                clearTimeout(_this.deffered.timer);
                var func = _this.deffered.func;
                _this.deffered = {};
                func();
            }
            else {
                console.error('Run unexisted deferred!');
            }
        };
        this._storage = storage;
        this.request =
            // request || 
            (function (ok) {
                if (ok === void 0) { ok = true; }
                return new Promise(function (resolve, reject) { return setTimeout(function () { return !ok ? resolve('OK') : reject('bad...'); }, 2000); });
            });
    }
    // должна вызываться из приложения, когда сторадж будет готов, и произойдет инициализация пользователя. может быть вызван повторно при смене пользователя
    // повесить декоратор инициализации, т.к. нельзя вызывать какие-то публичные методы предварительно не загрузив старые неотправленные данные
    Sender.prototype.restoreRequestsFromStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var requests;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.storage = new Storage(this._storage);
                        return [4 /*yield*/, this.storage.getRequests()];
                    case 1:
                        requests = _a.sent();
                        requests.forEach(function (_a) {
                            var id = _a.id, _b = _a.data, url = _b.url, params = _b.params;
                            var ro = new RequestOperand(url, params, id);
                            _this.queue.push(ro);
                        });
                        this.runner();
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
        var request = _a.request, storage = _a.storage, getCacheKey = _a.getCacheKey, serializer = _a.serializer;
        this.init = function () { return _this.sender.restoreRequestsFromStorage(); };
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
                var response, _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.httpRequest.apply(this, args)];
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
        this.sendRequest = function (url, params) {
            return _this.sender.send(url, params);
            return Promise.resolve({});
            //const cacheKey = this.getCacheKey(url, params)
            //await this.saveToQueue({ url, params, cacheKey, entity: (params || {}).entity || undefined });
        };
        this.receiveRequest = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
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
                            return [2 /*return*/, __assign({}, response ? { cached: this.mergeResponseWithCachedInfo(response, cacheStatus) } : {}, { network: this.receiveRequest(url, __assign({}, params, { requestCacheStrategy: RequestCacheStrategy.NetworkOnly })) })];
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
                    case 4: 
                    //} else if (requestType === RequestTypes.DataSendRequest) {
                    // TODO: big work!!!!!!!
                    /**
                     * 1. записать в сторадж (если очередь на отправку пустая, то в сторадж пишем только если пришла ошибка отправки нашего запроса,
                     *      если очередь не пустая, не важно нету сейчас соединения или запросы из очереди прямо сейчас отправляются успешно, пишем
                     *      сначала в сторадж, а потом добавляем в очередь запрос. т.к. вполне возмоно при наличии сети, что просто до запроса не дойдет
                     *      очередь потому что пользователь вырубил приложение)
                     *  - hash,
                     *  - request data
                     *  - requestId (по сути только url, параметризуется можно ли слать еще запросы на этот url (но с другим хэшэм) когда уже есть
                     *      неотправленные запросы
                     *  - entity возможно понадобится для чтения сущностей (ЭТО В СТОРАДЖЕ НЕ НУЖНО, это делается на уровне сторов)
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
        this.serializer = serializer;
        this.sender = new Sender({
            request: request,
            storage: storage
        });
    }
    return OfflineService;
}());

export default OfflineService;
export { RefreshCacheStrategy, RequestCacheStrategy, RequestTypes };
//# sourceMappingURL=offline-service.js.map
