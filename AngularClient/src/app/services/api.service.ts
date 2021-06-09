import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { DiagramItem } from '../model/diagram-item';
import { Relation } from '../model/relation';
import { Method } from '../model/method';
import { Diagram } from '../model/diagram';
import { Action } from '../contracts/action';
import ApiPath from 'src/app/infrastructure/api-path';

@Injectable({ providedIn: 'root' })
export class ApiService {

    constructor(
        private _localStorage: LocalStorageService,
        private _httpClient: HttpClient
    ) { }

    getAvailableDiagrams(): Promise<any> {
        var postData = {
            clientId: this._localStorage.authData.clientId
        };
        return this._httpClient.post(ApiPath.getAvailableDiagramsPath, postData).toPromise();
    }

    getDiagramById(id: string): Promise<any> {
        var postData = {
            clientId: this._localStorage.authData.clientId,
            diagramId: id
        };
        return this._httpClient.post(ApiPath.getDiagramByIdPath, postData).toPromise();
    }

    diagramSetTitle(diagram: Diagram): void {
        var postData = {
            clientId: this._localStorage.authData.clientId,
            diagramId: diagram.id,
            diagramTitle: diagram.title
        };
        this._httpClient.post(ApiPath.diagramSetTitlePath, postData).toPromise();
    }

    diagramLayout(diagram: Diagram): void {
        var postData = {
            clientId: this._localStorage.authData.clientId,
            diagramId: diagram.id,
            items: diagram.items.map(function (item) {
                return {
                    id: item.id,
                    x: item.position.x,
                    y: item.position.y,
                    width: item.size.width,
                    height: item.size.height
                };
            })
        };
        this._httpClient.post(ApiPath.diagramLayoutPath, postData).toPromise();
    }

    diagramItemMove(diagram: Diagram, item: DiagramItem): void {
        var postData = {
            clientId: this._localStorage.authData.clientId,
            diagramId: diagram.id,
            itemId: item.id,
            itemX: item.position.x,
            itemY: item.position.y
        };
        this._httpClient.post(ApiPath.diagramItemMovePath, postData).toPromise();
    }

    diagramItemResize(diagram: Diagram, item: DiagramItem): void {
        var postData = {
            clientId: this._localStorage.authData.clientId,
            diagramId: diagram.id,
            itemId: item.id,
            itemX: item.position.x,
            itemY: item.position.y,
            itemWidth: item.size.width,
            itemHeight: item.size.height
        };
        this._httpClient.post(ApiPath.diagramItemResizePath, postData).toPromise();
    }

    diagramItemSetTitle(diagram: Diagram, item: DiagramItem): void {
        var postData = {
            clientId: this._localStorage.authData.clientId,
            diagramId: diagram.id,
            itemId: item.id,
            itemTitle: item.title
        };
        this._httpClient.post(ApiPath.diagramItemSetTitlePath, postData).toPromise();
    }

    diagramItemAdd(action: Action, diagram: Diagram, item: DiagramItem, parentRelation: Relation, methods: Method[]): void {
        var postData = {
            clientId: this._localStorage.authData.clientId,
            actionId: action.id,
            diagramId: diagram.id,
            itemId: item.id,
            itemTitle: item.title,
            itemX: item.position.x,
            itemY: item.position.y,
            itemWidth: item.size.width,
            itemHeight: item.size.height,
            parentRelation: parentRelation ? { id: parentRelation.id, itemIdFrom: parentRelation.from.id, itemIdTo: parentRelation.to.id } : null,
            methods: methods.map(function (m) {
                return { id: m.id, signature: m.signature };
            })
        };
        this._httpClient.post(ApiPath.diagramItemAddPath, postData).toPromise();
    }

    diagramItemEdit(action: Action, diagram: Diagram, item: DiagramItem, parentHasChanged: boolean, parentRelation: Relation, methods: Method[]): void {
        var postData = {
            clientId: this._localStorage.authData.clientId,
            actionId: action.id,
            diagramId: diagram.id,
            itemId: item.id,
            itemTitle: item.title,
            parentHasChanged: parentHasChanged,
            parentRelation: parentRelation ? { id: parentRelation.id, itemIdFrom: parentRelation.from.id, itemIdTo: parentRelation.to.id } : null,
            methods: methods.map(function (m) {
                return { id: m.id, signature: m.signature };
            })
        };
        this._httpClient.post(ApiPath.diagramItemEditPath, postData).toPromise();
    }

    diagramItemDelete(action: Action, diagram: Diagram, items: DiagramItem[], relations: Relation[]): void {
        var postData = {
            clientId: this._localStorage.authData.clientId,
            actionId: action.id,
            diagramId: diagram.id,
            itemsId: items.map(x => x.id),
            relationsId: (relations ?? []).map(x => x.id),
        };
        this._httpClient.post(ApiPath.diagramItemDeletePath, postData).toPromise();
    }

    diagramItemSetMethods(diagram: Diagram, item: DiagramItem): void {
        var postData = {
            clientId: this._localStorage.authData.clientId,
            diagramId: diagram.id,
            itemId: item.id,
            methods: item.methods.map(function (m) {
                return { id: m.id, signature: m.signature };
            })
        };
        this._httpClient.post(ApiPath.diagramItemSetMethodsPath, postData).toPromise();
    }

    relationAdd(action: Action, diagram: Diagram, relations: Relation[]): void {
        var postData = {
            clientId: this._localStorage.authData.clientId,
            actionId: action.id,
            diagramId: diagram.id,
            relations: relations.map(function (r) {
                return { id: r.id, itemIdFrom: r.from.id, itemIdTo: r.to.id }
            })
        };
        this._httpClient.post(ApiPath.relationAddPath, postData).toPromise();
    }

    relationDelete(action: Action, diagram: Diagram, relations: Relation[]): void {
        var postData = {
            clientId: this._localStorage.authData.clientId,
            actionId: action.id,
            diagramId: diagram.id,
            relationsId: relations.map(r => r.id)
        };
        this._httpClient.post(ApiPath.relationDeletePath, postData).toPromise();
    }

    actionSetActive(action: Action): void {
        var postData = {
            clientId: this._localStorage.authData.clientId,
            actionId: action.id,
            diagramId: action.diagram.id
        };
        this._httpClient.post(ApiPath.actionSetActivePath, postData).toPromise();
    }
}
