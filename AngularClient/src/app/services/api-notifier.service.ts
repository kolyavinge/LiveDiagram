import { Injectable } from '@angular/core';
import { SignalRClient } from '../infrastructure/signalr-client';
import { LocalStorageService } from './local-storage.service';
import { AuthData } from 'src/app/services/local-storage.service'

@Injectable({ providedIn: 'root' })
export class ApiNotifierService {

    signalrClient: SignalRClient = new SignalRClient();
    authData: AuthData;
    diagramId: string;

    constructor(
        private localStorage: LocalStorageService
    ) {
        this.authData = this.localStorage.getAuthData();
    }

    connectToDiagram(diagramId: string): void {
        this.diagramId = diagramId;
        this.signalrClient.start(this.authData.clientId, this.diagramId);
    }

    clearHandlers(): void {
        this.signalrClient.clearHandlers();
    }

    onDiagramItemMove(handler: any): void {
        var self = this;
        self.signalrClient.addHandler("DiagramItemMoveResponse", function (response) {
            if (self.authData.clientId != response.clientId) {
                handler(response);
            }
        });
    }

    onDiagramItemResize(handler: any): void {
        var self = this;
        self.signalrClient.addHandler("DiagramItemResizeResponse", function (response) {
            if (self.authData.clientId != response.clientId) {
                handler(response);
            }
        });
    }
}
