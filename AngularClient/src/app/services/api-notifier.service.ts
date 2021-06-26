import { Injectable } from '@angular/core';
import { SignalRClient } from '../infrastructure/signalr-client';
import { LocalStorageService } from './local-storage.service';
import { AuthData } from 'src/app/services/local-storage.service';

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

    onSaveDiagram(handler: any): void {
        this.addHandler('SaveDiagramResponse', handler);
    }

    onDiagramSetTitle(handler: any): void {
        this.addHandler('DiagramSetTitleResponse', handler);
    }

    onDiagramLayout(handler: any): void {
        this.addHandler('DiagramLayoutResponse', handler);
    }

    onDiagramItemMove(handler: any): void {
        this.addHandler('DiagramItemMoveResponse', handler);
    }

    onDiagramItemResize(handler: any): void {
        this.addHandler('DiagramItemResizeResponse', handler);
    }

    onDiagramItemSetTitle(handler: any): void {
        this.addHandler('DiagramItemSetTitleResponse', handler);
    }

    onDiagramItemAdd(handler: any): void {
        this.addHandler('DiagramItemAddResponse', handler);
    }

    onDiagramItemEdit(handler: any): void {
        this.addHandler('DiagramItemEditResponse', handler);
    }

    onDiagramItemDelete(handler: any): void {
        this.addHandler('DiagramItemDeleteResponse', handler);
    }

    onDiagramItemSetMethods(handler: any): void {
        this.addHandler('DiagramItemSetMethodsResponse', handler);
    }

    onRelationAdd(handler: any): void {
        this.addHandler('RelationAddResponse', handler);
    }

    onRelationEdit(handler: any): void {
        this.addHandler('RelationEditResponse', handler);
    }

    onRelationDelete(handler: any): void {
        this.addHandler('RelationDeleteResponse', handler);
    }

    onActionSetActive(handler: any): void {
        this.addHandler('ActionSetActiveResponse', handler);
    }

    private addHandler(method: string, handler: any): void {
        let self = this;
        self._signalrClient.addHandler(method, response => {
            if (self._authData.clientId !== response.clientId) handler(response);
        });
    }
}
