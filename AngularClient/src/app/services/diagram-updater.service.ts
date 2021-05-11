import { Injectable } from '@angular/core';
import { ApiNotifierService } from 'src/app/services/api-notifier.service';
import { Diagram } from '../model/diagram';
import { DiagramItem } from '../model/diagram-item';
import { Method } from '../model/method';
import { Relation } from '../model/relation';

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
                self._diagram.moveItemTo(movedItem, response.itemX, response.itemY);
            }
        });

        self._apiNotifierService.onDiagramItemResize(function (response) {
            var resizedItem = self._diagram.getItemById(response.itemId);
            if (resizedItem) {
                self._diagram.setItemPosition(resizedItem, response.itemX, response.itemY);
                self._diagram.setItemSize(resizedItem, response.itemWidth, response.itemHeight);
            }
        });

        self._apiNotifierService.onDiagramItemSetTitle(function (response) {
            var item = self._diagram.getItemById(response.itemId);
            if (item) {
                item.title = response.itemTitle;
            }
        });

        self._apiNotifierService.onDiagramItemAdd(function (response) {
            var item = new DiagramItem(response.itemId);
            item.title = response.itemTitle;
            item.position.x = response.itemX;
            item.position.y = response.itemY;
            item.size.width = response.itemWidth;
            item.size.height = response.itemHeight;
            self._diagram.addItem(item);
        });

        self._apiNotifierService.onDiagramItemDelete(function (response) {
            var items = self._diagram.getItemsById(response.itemsId);
            self._diagram.deleteItems(items);
        });

        self._apiNotifierService.onDiagramItemSetMethods(function (response) {
            var item = self._diagram.getItemById(response.itemId);
            if (item) {
                item.methods = response.methods.map(m => {
                    var method = new Method(m.id);
                    method.signature = m.signature;
                    return method;
                });
            }
        });

        self._apiNotifierService.onRelationAdd(function (response) {
            response.relations.forEach(r => {
                var from = self._diagram.getItemById(r.itemIdFrom);
                var to = self._diagram.getItemById(r.itemIdTo);
                if (from && to) {
                    var relation = new Relation(r.id);
                    relation.setDiagramItems(from, to);
                };
                self._diagram.addRelation(relation);
            });
        });

        self._apiNotifierService.onRelationDelete(function (response) {
            var relations = self._diagram.getRelationsById(response.relationsId);
            self._diagram.deleteRelations(relations);
        });

        self._apiNotifierService.connectToDiagram(self._diagram.id);
    }
}
