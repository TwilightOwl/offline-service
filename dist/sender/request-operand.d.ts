import * as Types from '../types';
export default class RequestOperand {
    data: Types.SenderStorageItemData;
    private primary;
    private secondary?;
    id?: number;
    constructor(url: Types.SenderEndpoint, params: Omit<Types.SenderRequestInit, 'onFinally'> & {
        onFinally: (uid: string) => any;
    }, id?: number, uid?: string);
    private launch;
    private createPromise;
    readonly isNetworkError: boolean;
    readonly primaryPromise: Promise<any>;
    readonly resolve: Function;
    readonly reject: Function;
    rejectWithNetworkError: (createError: Types.CreateError) => void;
}
