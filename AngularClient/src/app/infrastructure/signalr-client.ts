import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import ApiPath from './api-path';

interface EventHandler {
    methodName: string;
    handler: any;
}

export class SignalRClient {

    connection: HubConnection;
    handlers: EventHandler[] = [];

    addHandler(methodName: string, handler: any): void {
        this.handlers.push({ methodName: methodName, handler: handler });
    }

    clearHandlers(): void {
        this.handlers = [];
    }

    start(clientId: string, diagramId: string): Promise<void> {
        let self = this;
        let registerData = { clientId: clientId, diagramId: diagramId };
        let registerFunc = () => { self.connection.invoke('Register', registerData); };
        self.connection = new HubConnectionBuilder().withUrl(ApiPath.host + 'hub').build();
        for (let handler of self.handlers) {
            self.connection.on(handler.methodName, handler.handler);
        }

        return self.connection.start().then(registerFunc);
    }
}
