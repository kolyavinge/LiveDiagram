
export class DelayedRequest {

    private _requestAction;
    private _requestParam;
    private _timeout: number;
    private _timerId: number;

    constructor(requestAction, timeout: number = 5000) {
        this._requestAction = requestAction;
        this._timeout = timeout;
    }

    send(requestParam = null): void {
        let self = this;
        self._requestParam = requestParam;
        window.clearTimeout(self._timerId);
        self._timerId = window.setTimeout(() => { this._requestAction(self._requestParam); }, self._timeout);
    }
}
