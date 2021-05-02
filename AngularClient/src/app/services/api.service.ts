import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DiagramItem } from '../model/diagram-item';
import { LocalStorageService } from './local-storage.service';
import { Diagram } from '../model/diagram';
import ApiPath from 'src/app/infrastructure/api-path';

@Injectable({ providedIn: 'root' })
export class ApiService {

    constructor(
        private _localStorage: LocalStorageService,
        private _httpClient: HttpClient
    ) { }

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

    diagramItemAdd(diagram: Diagram, item: DiagramItem): void {
        var postData = {
            clientId: this._localStorage.authData.clientId,
            diagramId: diagram.id,
            itemId: item.id,
            itemTitle: item.title,
            itemX: item.position.x,
            itemY: item.position.y,
            itemWidth: item.size.width,
            itemHeight: item.size.height
        };
        this._httpClient.post(ApiPath.diagramItemAddPath, postData).toPromise();
    }

    diagramItemDelete(diagram: Diagram, item: DiagramItem): void {
        var postData = {
            clientId: this._localStorage.authData.clientId,
            diagramId: diagram.id,
            itemId: item.id
        };
        this._httpClient.post(ApiPath.diagramItemDeletePath, postData).toPromise();
    }
}
