import { Injectable } from '@angular/core';
import { EditDiagramItemResult } from '../contracts/edit-diagram-item-result';
import { Diagram } from '../model/diagram';
import { DiagramItem } from '../model/diagram-item';
import { InheritanceLogic } from '../model/inheritance-logic';
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

        self._diagramEventsService.diagramItemAddEvent.addHandler((result: EditDiagramItemResult) => {
            var item = new DiagramItem();
            item.setPosition(100, 100);
            item.setSize(120, 160);
            item.title = result.titleNew;
            self._diagram.addItem(item);
            self._apiService.diagramItemAdd(self._diagram, item);
            if (result.parentNew) {
                var parentRelationNew = new Relation();
                parentRelationNew.setDiagramItems(result.parentNew, item);
                self._diagram.addRelations([parentRelationNew]);
                self._apiService.relationAdd(self._diagram, [parentRelationNew]);
            }
        });

        self._diagramEventsService.diagramItemDeleteEvent.addHandler((diagramItems: DiagramItem[]) => {
            self._diagram.deleteItems(diagramItems);
            var relations = diagramItems.map(i => self._diagram.getItemRelations(i)).reduce((x, y) => x.concat(y), []); // flat array
            var relationsDistinct = Array.from(new Set(relations));
            self._diagram.deleteRelations(relationsDistinct);
            self._apiService.diagramItemDelete(self._diagram, diagramItems);
            self._apiService.relationDelete(self._diagram, relationsDistinct);
        });

        self._diagramEventsService.diagramItemEditEvent.addHandler((result: EditDiagramItemResult) => {
            var item = result.item;
            if (result.titleHasChanged) {
                item.title = result.titleNew;
            }
            if (result.parentHasChanged) {
                var logic = new InheritanceLogic();
                var parentRelationOld = logic.getParentRelation(self._diagram, item);
                if (parentRelationOld) {
                    self._diagram.deleteRelations([parentRelationOld]);
                    self._apiService.relationDelete(self._diagram, [parentRelationOld]);
                }
                if (result.parentNew) {
                    var parentRelationNew = new Relation();
                    parentRelationNew.setDiagramItems(result.parentNew, item);
                    self._diagram.addRelations([parentRelationNew]);
                    self._apiService.relationAdd(self._diagram, [parentRelationNew]);
                }
            }
            if (result.methodsHasChanged) {
                item.methods = result.methodsNew;
                self._apiService.diagramItemSetMethods(self._diagram, item);
            }
        });

        self._diagramEventsService.relationAddEvent.addHandler((relations: Relation[]) => {
            self._diagram.addRelations(relations);
            self._apiService.relationAdd(self._diagram, relations);
        });

        self._diagramEventsService.relationDeleteEvent.addHandler((relations: Relation[]) => {
            self._diagram.deleteRelations(relations);
            self._apiService.relationDelete(self._diagram, relations);
        });
    }
}
