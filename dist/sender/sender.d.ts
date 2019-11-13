import { IStorage } from '../storage';
import * as Types from '../types';
interface Constructor {
    request: Types.HttpRequest;
    storage: IStorage;
    requestHandler: Types.RequestHandler;
    createError: Types.CreateError;
    defaultParameters: Types.SenderRequestInit;
}
export default class Sender {
    private queue;
    private connected;
    private idle;
    private process;
    private request;
    private storage;
    private requestHandler;
    private createError;
    private defaultParameters;
    private deferred;
    constructor({ request, storage, requestHandler, createError, defaultParameters }: Constructor);
    private createServiceError;
    restoreRequestsFromStorage(): Promise<void>;
    finalize(): void;
    send(url: Types.SenderEndpoint, params: Types.SenderRequestInit): Promise<any>;
    private runner;
    private task;
    private rejectAll;
    private createDeferred;
    private runDeferred;
}
export {};
