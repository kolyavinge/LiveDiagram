import { Injectable } from '@angular/core';
import { Diagram } from '../model/diagram';
import { DiagramItem, DiagramItemState } from '../model/diagram-item';
import { Relation } from '../model/relation';
import { Method } from '../model/method';
import { Point } from '../model/point';
import { Size } from '../model/size';
import { InheritanceLogic } from '../model/inheritance-logic';
import { ApiNotifierService } from 'src/app/services/api-notifier.service';
import { ActionService } from './action.service';
import { DiagramItemAddAction } from '../actions/diagram-item-add-action';
import { DiagramItemEditAction } from '../actions/diagram-item-edit-action';
import { DiagramItemDeleteAction } from '../actions/diagram-item-delete-action';
import { DiagramItemMoveAction } from '../actions/diagram-item-move-action';
import { DiagramItemResizeAction } from '../actions/diagram-item-resize-action';
import { RelationAddAction } from '../actions/relation-add-action';
import { RelationDeleteAction } from '../actions/relation-delete-action';

@Injectable({ providedIn: 'root' })
export class DiagramUpdaterService {

    private _diagram: Diagram;

    constructor(
        private _apiNotifierService: ApiNotifierService,
        private _actionService: ActionService
    ) { }

    connectToDiagram(diagram: Diagram): void {
        var self = this;
        self._diagram = diagram;

        self._apiNotifierService.clearHandlers();

        self._apiNotifierService.onDiagramSetTitle(function (response) {
            self._diagram.title = response.diagramTitle;
        });

        self._apiNotifierService.onDiagramLayout(function (response) {
            self._diagram.updateItems(response.items.map(function (i) {
                return { id: i.id, position: new Point(i.x, i.y), size: new Size(i.width, i.height) };
            }));
        });

        self._apiNotifierService.onDiagramItemMove(function (response) {
            var movedItem = self._diagram.getItemById(response.itemId);
            if (movedItem) {
                var positionOld = movedItem.position;
                var positionNew = new Point(response.itemX, response.itemY);
                var action = new DiagramItemMoveAction(response.actionId, self._diagram, movedItem, positionOld, positionNew);
                action.do();
                self._actionService.addAction(action);
            }
        });

        self._apiNotifierService.onDiagramItemResize(function (response) {
            var item = self._diagram.getItemById(response.itemId);
            if (item) {
                var positionOld = item.position;
                var sizeOld = item.size;
                var positionNew = new Point(response.itemX, response.itemY);
                var sizeNew = new Size(response.itemWidth, response.itemHeight);
                var action = new DiagramItemResizeAction(response.actionId, self._diagram, item, positionOld, sizeOld, positionNew, sizeNew);
                action.do();
                self._actionService.addAction(action);
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
            item.position = new Point(response.itemX, response.itemY);
            item.size = new Size(response.itemWidth, response.itemHeight);
            var parentRelation: Relation = null;
            if (response.parentRelation) {
                var parent = self._diagram.getItemById(response.parentRelation.itemIdFrom);
                if (parent) {
                    parentRelation = new Relation(response.parentRelation.id);
                    parentRelation.setDiagramItems(parent, item);
                }
            }
            if (response.methods.length > 0) {
                item.methods = response.methods.map(m => {
                    var method = new Method(m.id);
                    method.signature = m.signature;
                    return method;
                });
            }
            var action = new DiagramItemAddAction(response.actionId, self._diagram, item, parentRelation);
            action.do();
            self._actionService.addAction(action);
        });

        self._apiNotifierService.onDiagramItemEdit(function (response) {
            var item = self._diagram.getItemById(response.itemId);
            if (response.parentHasChanged) {
                var logic = new InheritanceLogic();
                var parentRelationOld = logic.getParentRelation(self._diagram, item);
            }
            if (response.parentRelation) {
                var parent = self._diagram.getItemById(response.parentRelation.itemIdFrom);
                if (parent) {
                    var parentRelationNew = new Relation(response.parentRelation.id);
                    parentRelationNew.setDiagramItems(parent, item);
                }
            }
            var methodsNew = response.methods.map(m => {
                var method = new Method(m.id);
                method.signature = m.signature;
                return method;
            });
            var action = new DiagramItemEditAction(
                response.actionId, self._diagram, item, item.title, response.itemTitle, parentRelationOld, parentRelationNew, item.methods, methodsNew);
            action.do();
            self._actionService.addAction(action);
        });

        self._apiNotifierService.onDiagramItemDelete(function (response) {
            var items = self._diagram.getItemsById(response.itemsId);
            var relations = self._diagram.getRelationsById(response.relationsId);
            var action = new DiagramItemDeleteAction(response.actionId, self._diagram, items, relations);
            action.do();
            self._actionService.addAction(action);
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
            var relations: Relation[] = response.relations.map(r => {
                var from = self._diagram.getItemById(r.itemIdFrom);
                var to = self._diagram.getItemById(r.itemIdTo);
                if (from && to) {
                    var relation = new Relation(r.id);
                    relation.setDiagramItems(from, to);
                    return relation;
                };
            });
            if (relations.length > 0) {
                var action = new RelationAddAction(response.actionId, self._diagram, relations);
                action.do();
                self._actionService.addAction(action);
            }
        });

        self._apiNotifierService.onRelationDelete(function (response) {
            var relations = self._diagram.getRelationsById(response.relationsId);
            var action = new RelationDeleteAction(response.actionId, self._diagram, relations);
            action.do();
            self._actionService.addAction(action);
        });

        self._apiNotifierService.onActionSetActive(function (response) {
            var action = self._actionService.getActionById(response.actionId);
            self._actionService.updateActiveAction(action);
        });

        self._apiNotifierService.connectToDiagram(self._diagram.id);
    }
}
