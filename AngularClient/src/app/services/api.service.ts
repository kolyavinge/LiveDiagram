import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DiagramItem } from '../model/diagram-item';
import { LocalStorageService } from './local-storage.service';
import { Diagram } from '../model/diagram';
import ApiPath from 'src/app/infrastructure/api-path';

@Injectable({ providedIn: 'root' })
export class ApiService {

    constructor(
        private localStorage: LocalStorageService,
        private httpClient: HttpClient
    ) { }

    diagramItemMove(item: DiagramItem): void {
        var authData = this.localStorage.getAuthData();
        var postData = {
            clientId: authData.clientId,
            diagramId: this.localStorage.getCurrentDiagram().id,
            itemId: item.id,
            x: item.position.x,
            y: item.position.y
        };
        this.httpClient.post(ApiPath.diagramItemMovePath, postData).toPromise();
    }

    diagramItemResize(item: DiagramItem): void {
        var authData = this.localStorage.getAuthData();
        var postData = {
            clientId: authData.clientId,
            diagramId: this.localStorage.getCurrentDiagram().id,
            itemId: item.id,
            x: item.position.x,
            y: item.position.y,
            width: item.size.width,
            height: item.size.height,
        };
        this.httpClient.post(ApiPath.diagramItemResizePath, postData).toPromise();
    }

    diagramItemSetTitle(item: DiagramItem): void {
        var authData = this.localStorage.getAuthData();
        var postData = {
            clientId: authData.clientId,
            diagramId: this.localStorage.getCurrentDiagram().id,
            itemId: item.id,
            itemTitle: item.title
        };
        this.httpClient.post(ApiPath.diagramItemSetTitlePath, postData).toPromise();
    }
}
