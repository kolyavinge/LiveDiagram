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

    diagramItemMove(diagram: Diagram, item: DiagramItem): void {
        var postData = {
            clientId: this.localStorage.authData.clientId,
            diagramId: diagram.id,
            itemId: item.id,
            x: item.position.x,
            y: item.position.y
        };
        this.httpClient.post(ApiPath.diagramItemMovePath, postData).toPromise();
    }

    diagramItemResize(diagram: Diagram, item: DiagramItem): void {
        var postData = {
            clientId: this.localStorage.authData.clientId,
            diagramId: diagram.id,
            itemId: item.id,
            x: item.position.x,
            y: item.position.y,
            width: item.size.width,
            height: item.size.height,
        };
        this.httpClient.post(ApiPath.diagramItemResizePath, postData).toPromise();
    }

    diagramItemSetTitle(diagram: Diagram, item: DiagramItem): void {
        var postData = {
            clientId: this.localStorage.authData.clientId,
            diagramId: diagram.id,
            itemId: item.id,
            itemTitle: item.title
        };
        this.httpClient.post(ApiPath.diagramItemSetTitlePath, postData).toPromise();
    }
}
