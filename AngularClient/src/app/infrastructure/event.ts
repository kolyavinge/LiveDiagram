
export class Event {
    private _handlers: any[] = [];

    addHandler(handler: any): void {
        this._handlers.push(handler);
    }

    raise(args): void {
        this._handlers.forEach(h => h(args));
    }
}
