import { Injectable } from '@angular/core';
import { ApiNotifierService } from 'src/app/services/api-notifier.service';
import { Diagram } from '../model/diagram';

@Injectable({ providedIn: 'root' })
export class DiagramUpdaterService {

    private _diagram: Diagram;

    constructor(
        private _apiNotifierService: ApiNotifierService
    ) { }

    connectToDiagram(diagram: Diagram): void {
        var self = this;
        self._diagram = diagram;

        self._apiNotifierService.clearHandlers();

        self._apiNotifierService.onDiagramItemMove(function (response) {
            var movedItem = self._diagram.getItemById(response.itemId);
            if (movedItem) {
                self._diagram.moveItemTo(movedItem, response.x, response.y);
            }
        });

        self._apiNotifierService.onDiagramItemResize(function (response) {
            var resizedItem = self._diagram.getItemById(response.itemId);
            if (resizedItem) {
                self._diagram.setItemPosition(resizedItem, response.x, response.y);
                self._diagram.setItemSize(resizedItem, response.width, response.height);
            }
        });

        self._apiNotifierService.onDiagramItemSetTitle(function (response) {
            var item = self._diagram.getItemById(response.itemId);
            if (item) {
                item.title = response.itemTitle;
            }
        });

        self._apiNotifierService.connectToDiagram(self._diagram.id);
    }
}
