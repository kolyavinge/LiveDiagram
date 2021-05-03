import { Injectable } from '@angular/core';
import { Diagram } from '../model/diagram';
import { DiagramItem } from '../model/diagram-item';
import { Relation } from '../model/relation';
import { ApiService } from './api.service';
import { DiagramEventsService } from './diagram-events.service';
import { DiagramUpdaterService } from './diagram-updater.service';

@Injectable({ providedIn: 'root' })
export class DiagramService {

    private _diagram: Diagram;

    constructor(
        private _apiService: ApiService,
        private _diagramEventsService: DiagramEventsService,
        private _diagramUpdaterService: DiagramUpdaterService
    ) {
        var self = this;
        self._diagram = new Diagram();
        self._apiService.getDiagramById("12345").then(response => {
            self._diagram = self.makeDiagramFromResponse(response);
            self._diagramUpdaterService.connectToDiagram(self._diagram);
            self.addHandlers();
            self._diagramEventsService.diagramLoadedEvent.raise(self._diagram);
        });
    }

    private makeDiagramFromResponse(response): Diagram {
        var diagram = new Diagram(response.diagram.id);
        response.diagram.items.forEach(i => {
            var item = new DiagramItem(i.id);
            item.title = i.title;
            item.setPosition(i.x, i.y);
            item.setSize(i.width, i.height);
            diagram.addItem(item);
        });
        response.diagram.relations.forEach(r => {
            var from = diagram.getItemById(r.itemIdFrom);
            var to = diagram.getItemById(r.itemIdTo);
            var relation = new Relation(r.id);
            relation.setDiagramItems(from, to);
            diagram.addRelation(relation);
        });

        return diagram;
    }

    get diagram(): Diagram {
        return this._diagram;
    }

    addHandlers(): void {
        var self = this;

        self._diagramEventsService.diagramItemMoveEvent.addHandler((diagramItem: DiagramItem) => {
            self._apiService.diagramItemMove(self._diagram, diagramItem);
        });

        self._diagramEventsService.diagramItemResizeEvent.addHandler((diagramItem: DiagramItem) => {
            self._apiService.diagramItemResize(self._diagram, diagramItem);
        });

        self._diagramEventsService.diagramItemSetTitleEvent.addHandler((diagramItem: DiagramItem) => {
            self._apiService.diagramItemSetTitle(self._diagram, diagramItem);
        });

        self._diagramEventsService.diagramItemAddEvent.addHandler((diagramItem: DiagramItem) => {
            self._diagram.addItem(diagramItem);
            self._apiService.diagramItemAdd(self._diagram, diagramItem);
        });

        self._diagramEventsService.diagramItemDeleteEvent.addHandler((diagramItem: DiagramItem) => {
            self._diagram.deleteItem(diagramItem);
            self._apiService.diagramItemDelete(self._diagram, diagramItem);
        });
    }
}
