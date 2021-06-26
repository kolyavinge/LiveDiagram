import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DiagramItemPosition } from '../common/diagram-item-position';
import { LocalStorageService } from './local-storage.service';
import { DiagramItem } from '../model/diagram-item';
import { Relation } from '../model/relation';
import { Method } from '../model/method';
import { Diagram } from '../model/diagram';
import { Action } from '../common/action';
import ApiPath from 'src/app/infrastructure/api-path';

@Injectable({ providedIn: 'root' })
export class ApiService {

    constructor(
        private _localStorage: LocalStorageService,
        private _httpClient: HttpClient
    ) { }

    getAvailableDiagrams(): Promise<any> {
        let postData = {
            clientId: this._localStorage.authData.clientId
        };
        return this._httpClient.post(ApiPath.getAvailableDiagramsPath, postData).toPromise();
    }

    getDiagramById(id: string): Promise<any> {
        let postData = {
            clientId: this._localStorage.authData.clientId,
            diagramId: id
        };
        return this._httpClient.post(ApiPath.getDiagramByIdPath, postData).toPromise();
    }

    saveDiagram(diagram: Diagram): Promise<any> {
        let postData = {
            clientId: this._localStorage.authData.clientId,
            diagramId: diagram.id,
            diagram: {
                id: diagram.id,
                title: diagram.title,
                items: diagram.items.map(i => ({
                    id: i.id,
                    title: i.title,
                    x: i.position.x,
                    y: i.position.y,
                    width: i.size.width,
                    height: i.size.height,
                    methods: i.methods.map(m => ({ id: m.id, signature: m.signature }))
                })),
                relations: diagram.relations.map(r => ({
                    id: r.id,
                    itemIdFrom: r.from.id,
                    itemIdTo: r.to.id
                }))
            }
        };
        return this._httpClient.post(ApiPath.saveDiagramPath, postData).toPromise();
    }

    diagramSetTitle(action: Action, diagram: Diagram): void {
        let postData = {
            clientId: this._localStorage.authData.clientId,
            actionId: action.id,
            diagramId: diagram.id,
            diagramTitle: diagram.title
        };
        this._httpClient.post(ApiPath.diagramSetTitlePath, postData).toPromise();
    }

    diagramLayout(action: Action, diagram: Diagram): void {
        let postData = {
            clientId: this._localStorage.authData.clientId,
            actionId: action.id,
            diagramId: diagram.id,
            items: diagram.items.map(item => ({
                id: item.id,
                x: item.position.x,
                y: item.position.y,
                width: item.size.width,
                height: item.size.height
            }))
        };
        this._httpClient.post(ApiPath.diagramLayoutPath, postData).toPromise();
    }

    diagramItemMove(action: Action, diagram: Diagram, items: DiagramItemPosition[]): void {
        let postData = {
            clientId: this._localStorage.authData.clientId,
            actionId: action.id,
            diagramId: diagram.id,
            items: items.map(x => ({ id: x.item.id, x: x.item.position.x, y: x.item.position.y }))
        };
        this._httpClient.post(ApiPath.diagramItemMovePath, postData).toPromise();
    }

    diagramItemResize(action: Action, diagram: Diagram, item: DiagramItem): void {
        let postData = {
            clientId: this._localStorage.authData.clientId,
            actionId: action.id,
            diagramId: diagram.id,
            itemId: item.id,
            itemX: item.position.x,
            itemY: item.position.y,
            itemWidth: item.size.width,
            itemHeight: item.size.height
        };
        this._httpClient.post(ApiPath.diagramItemResizePath, postData).toPromise();
    }

    diagramItemSetTitle(action: Action, diagram: Diagram, item: DiagramItem): void {
        let postData = {
            clientId: this._localStorage.authData.clientId,
            actionId: action.id,
            diagramId: diagram.id,
            itemId: item.id,
            itemTitle: item.title
        };
        this._httpClient.post(ApiPath.diagramItemSetTitlePath, postData).toPromise();
    }

    diagramItemAdd(action: Action, diagram: Diagram, item: DiagramItem, parentRelation: Relation, methods: Method[]): void {
        let postData = {
            clientId: this._localStorage.authData.clientId,
            actionId: action.id,
            diagramId: diagram.id,
            item: {
                id: item.id,
                title: item.title,
                x: item.position.x,
                y: item.position.y,
                width: item.size.width,
                height: item.size.height,
                methods: methods.map((m) => ({ id: m.id, signature: m.signature }))
            },
            parentRelation: parentRelation ? { id: parentRelation.id, itemIdFrom: parentRelation.from.id, itemIdTo: parentRelation.to.id } : null,
        };
        this._httpClient.post(ApiPath.diagramItemAddPath, postData).toPromise();
    }

    diagramItemEdit(action: Action, diagram: Diagram, item: DiagramItem, parentHasChanged: boolean, parentRelation: Relation, methods: Method[]): void {
        let postData = {
            clientId: this._localStorage.authData.clientId,
            actionId: action.id,
            diagramId: diagram.id,
            itemId: item.id,
            itemTitle: item.title,
            parentHasChanged: parentHasChanged,
            parentRelation: parentRelation ? { id: parentRelation.id, itemIdFrom: parentRelation.from.id, itemIdTo: parentRelation.to.id } : null,
            methods: methods.map(m => ({ id: m.id, signature: m.signature }))
        };
        this._httpClient.post(ApiPath.diagramItemEditPath, postData).toPromise();
    }

    diagramItemDelete(action: Action, diagram: Diagram, items: DiagramItem[], relations: Relation[]): void {
        let postData = {
            clientId: this._localStorage.authData.clientId,
            actionId: action.id,
            diagramId: diagram.id,
            itemsId: items.map(x => x.id),
            relationsId: (relations ?? []).map(x => x.id),
        };
        this._httpClient.post(ApiPath.diagramItemDeletePath, postData).toPromise();
    }

    diagramItemSetMethods(diagram: Diagram, item: DiagramItem): void {
        let postData = {
            clientId: this._localStorage.authData.clientId,
            diagramId: diagram.id,
            itemId: item.id,
            methods: item.methods.map(m => ({ id: m.id, signature: m.signature }))
        };
        this._httpClient.post(ApiPath.diagramItemSetMethodsPath, postData).toPromise();
    }

    relationAdd(action: Action, diagram: Diagram, relations: Relation[]): void {
        let postData = {
            clientId: this._localStorage.authData.clientId,
            actionId: action.id,
            diagramId: diagram.id,
            relations: relations.map(r => ({ id: r.id, itemIdFrom: r.from.id, itemIdTo: r.to.id }))
        };
        this._httpClient.post(ApiPath.relationAddPath, postData).toPromise();
    }

    relationEdit(action: Action, diagram: Diagram, relationOld: Relation, relationNew: Relation): void {
        let postData = {
            clientId: this._localStorage.authData.clientId,
            actionId: action.id,
            diagramId: diagram.id,
            relationOld: { id: relationOld.id, itemIdFrom: relationOld.from.id, itemIdTo: relationOld.to.id },
            relationNew: { id: relationNew.id, itemIdFrom: relationNew.from.id, itemIdTo: relationNew.to.id }
        };
        this._httpClient.post(ApiPath.relationEditPath, postData).toPromise();
    }

    relationDelete(action: Action, diagram: Diagram, relations: Relation[]): void {
        let postData = {
            clientId: this._localStorage.authData.clientId,
            actionId: action.id,
            diagramId: diagram.id,
            relationsId: relations.map(r => r.id)
        };
        this._httpClient.post(ApiPath.relationDeletePath, postData).toPromise();
    }

    actionSetActive(action: Action): void {
        let postData = {
            clientId: this._localStorage.authData.clientId,
            actionId: action.id,
            diagramId: action.diagram.id
        };
        this._httpClient.post(ApiPath.actionSetActivePath, postData).toPromise();
    }
}
