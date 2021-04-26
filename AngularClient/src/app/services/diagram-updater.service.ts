import { Injectable } from '@angular/core';
import { ApiNotifierService } from 'src/app/services/api-notifier.service';
import { Diagram } from '../model/diagram';

@Injectable({ providedIn: 'root' })
export class DiagramUpdaterService {

    diagram: Diagram;

    constructor(
        private apiNotifierService: ApiNotifierService
    ) {
    }

    connectToDiagram(diagram: Diagram): void {
        var self = this;
        self.diagram = diagram;

        self.apiNotifierService.clearHandlers();

        self.apiNotifierService.onDiagramItemMove(function (response) {
            var movedItem = self.diagram.getItemById(response.itemId);
            if (movedItem) {
                self.diagram.moveItemTo(movedItem, response.x, response.y);
            }
        });

        self.apiNotifierService.onDiagramItemResize(function (response) {
            var resizedItem = self.diagram.getItemById(response.itemId);
            if (resizedItem) {
                self.diagram.setItemPosition(resizedItem, response.x, response.y);
                self.diagram.setItemSize(resizedItem, response.width, response.height);
            }
        });

        self.apiNotifierService.onDiagramItemSetTitle(function (response) {
            var item = self.diagram.getItemById(response.itemId);
            if (item) {
                console.log('onDiagramItemSetTitle');
                item.title = response.itemTitle;
            }
        });

        self.apiNotifierService.connectToDiagram(self.diagram.id);
    }
}
