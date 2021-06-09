import { Injectable } from '@angular/core';
import { SignalRClient } from '../infrastructure/signalr-client';
import { LocalStorageService } from './local-storage.service';
import { AuthData } from 'src/app/services/local-storage.service'

@Injectable({ providedIn: 'root' })
export class ApiNotifierService {

    private _signalrClient: SignalRClient = new SignalRClient();
    private _authData: AuthData;
    private _diagramId: string;

    constructor(
        private _localStorage: LocalStorageService
    ) {
        this._authData = this._localStorage.authData;
    }

    connectToDiagram(diagramId: string): void {
        this._diagramId = diagramId;
        this._signalrClient.start(this._authData.clientId, this._diagramId);
    }

    clearHandlers(): void {
        this._signalrClient.clearHandlers();
    }

    onDiagramSetTitle(handler: any): void {
        var self = this;
        self._signalrClient.addHandler("DiagramSetTitleResponse", function (response) {
            if (self._authData.clientId != response.clientId) handler(response);
        });
    }

    onDiagramLayout(handler: any): void {
        var self = this;
        self._signalrClient.addHandler("DiagramLayoutResponse", function (response) {
            if (self._authData.clientId != response.clientId) handler(response);
        });
    }

    onDiagramItemMove(handler: any): void {
        var self = this;
        self._signalrClient.addHandler("DiagramItemMoveResponse", function (response) {
            if (self._authData.clientId != response.clientId) handler(response);
        });
    }

    onDiagramItemResize(handler: any): void {
        var self = this;
        self._signalrClient.addHandler("DiagramItemResizeResponse", function (response) {
            if (self._authData.clientId != response.clientId) handler(response);
        });
    }

    onDiagramItemSetTitle(handler: any): void {
        var self = this;
        self._signalrClient.addHandler("DiagramItemSetTitleResponse", function (response) {
            if (self._authData.clientId != response.clientId) handler(response);
        });
    }

    onDiagramItemAdd(handler: any): void {
        var self = this;
        self._signalrClient.addHandler("DiagramItemAddResponse", function (response) {
            if (self._authData.clientId != response.clientId) handler(response);
        });
    }

    onDiagramItemEdit(handler: any): void {
        var self = this;
        self._signalrClient.addHandler("DiagramItemEditResponse", function (response) {
            if (self._authData.clientId != response.clientId) handler(response);
        });
    }

    onDiagramItemDelete(handler: any): void {
        var self = this;
        self._signalrClient.addHandler("DiagramItemDeleteResponse", function (response) {
            if (self._authData.clientId != response.clientId) handler(response);
        });
    }

    onDiagramItemSetMethods(handler: any): void {
        var self = this;
        self._signalrClient.addHandler("DiagramItemSetMethodsResponse", function (response) {
            if (self._authData.clientId != response.clientId) handler(response);
        });
    }

    onRelationAdd(handler: any): void {
        var self = this;
        self._signalrClient.addHandler("RelationAddResponse", function (response) {
            if (self._authData.clientId != response.clientId) handler(response);
        });
    }

    onRelationDelete(handler: any): void {
        var self = this;
        self._signalrClient.addHandler("RelationDeleteResponse", function (response) {
            if (self._authData.clientId != response.clientId) handler(response);
        });
    }

    onActionSetActive(handler: any): void {
        var self = this;
        self._signalrClient.addHandler("ActionSetActiveResponse", function (response) {
            if (self._authData.clientId != response.clientId) handler(response);
        });
    }
}
