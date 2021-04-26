import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import ApiPath from './api-path';

interface EventHandler {
    methodName: string,
    handler: any
}

export class SignalRClient {

    connection: HubConnection
    handlers: EventHandler[] = []

    constructor() {
    }

    addHandler(methodName: string, handler: any): void {
        this.handlers.push({ methodName: methodName, handler: handler });
    }

    clearHandlers(): void {
        this.handlers = [];
    }

    start(clientId: string, diagramId: string): Promise<void> {
        var self = this;
        var registerData = { clientId: clientId, diagramId: diagramId };
        var registerFunc = function () { self.connection.invoke("Register", registerData); }
        self.connection = new HubConnectionBuilder().withUrl(ApiPath.host + "hub").build();
        for (var i in self.handlers) {
            var handler = self.handlers[i];
            self.connection.on(handler.methodName, handler.handler);
        }

        return self.connection.start().then(registerFunc);
    }
}
