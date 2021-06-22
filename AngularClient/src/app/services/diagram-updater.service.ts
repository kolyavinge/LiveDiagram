import { Injectable } from '@angular/core';
import { Point } from '../common/point';
import { Size } from '../common/size';
import { Diagram } from '../model/diagram';
import { DiagramItem } from '../model/diagram-item';
import { Relation } from '../model/relation';
import { Method } from '../model/method';
import { InheritanceLogic } from '../model/inheritance-logic';
import { ApiNotifierService } from 'src/app/services/api-notifier.service';
import { ActionService } from './action.service';
import { ActionFactory } from '../common/action-factory';

@Injectable({ providedIn: 'root' })
export class DiagramUpdaterService {

    private _actionFactory = new ActionFactory();
    private _diagram: Diagram;

    constructor(
        private _apiNotifierService: ApiNotifierService,
        private _actionService: ActionService
    ) { }

    connectToDiagram(diagram: Diagram): void {
        let self = this;
        self._diagram = diagram;

        self._apiNotifierService.clearHandlers();

        self._apiNotifierService.onDiagramSetTitle(response => {
            let action = self._actionFactory.addDiagramSetTitleAction(response.actionId, self._diagram, self._diagram.title, response.diagramTitle);
            action.do();
            self._actionService.addAction(action);
        });

        self._apiNotifierService.onDiagramLayout(response => {
            let itemsOld = diagram.items.map(i => i.getState({ position: true }));
            let itemsNew = response.items.map((i) => {
                return { id: i.id, position: new Point(i.x, i.y), size: new Size(i.width, i.height) };
            });
            let action = self._actionFactory.addDiagramLayoutAction(response.actionId, self._diagram, itemsOld, itemsNew);
            action.do();
            self._actionService.addAction(action);
        });

        self._apiNotifierService.onDiagramItemMove(response => {
            let movedItem = self._diagram.getItemById(response.itemId);
            if (movedItem) {
                let positionOld = movedItem.position;
                let positionNew = new Point(response.itemX, response.itemY);
                let action = self._actionFactory.addDiagramItemMoveAction(response.actionId, self._diagram, movedItem, positionOld, positionNew);
                action.do();
                self._actionService.addAction(action);
            }
        });

        self._apiNotifierService.onDiagramItemResize(response => {
            let item = self._diagram.getItemById(response.itemId);
            if (item) {
                let positionOld = item.position;
                let sizeOld = item.size;
                let positionNew = new Point(response.itemX, response.itemY);
                let sizeNew = new Size(response.itemWidth, response.itemHeight);
                let action = self._actionFactory.addDiagramItemResizeAction(response.actionId, self._diagram, item, positionOld, sizeOld, positionNew, sizeNew);
                action.do();
                self._actionService.addAction(action);
            }
        });

        self._apiNotifierService.onDiagramItemSetTitle(response => {
            let item = self._diagram.getItemById(response.itemId);
            if (item) {
                let action = self._actionFactory.addDiagramItemSetTitleAction(response.actionId, self._diagram, item, item.title, response.itemTitle);
                action.do();
                self._actionService.addAction(action);
            }
        });

        self._apiNotifierService.onDiagramItemAdd(response => {
            let item = DiagramItem.makeFromObject(response.item);
            let parentRelation: Relation = null;
            if (response.parentRelation) {
                let parent = self._diagram.getItemById(response.parentRelation.itemIdFrom);
                if (parent) {
                    parentRelation = Relation.makeWithItems(response.parentRelation.id, parent, item);
                }
            }
            let action = self._actionFactory.addDiagramItemAddAction(response.actionId, self._diagram, item, parentRelation);
            action.do();
            self._actionService.addAction(action);
        });

        self._apiNotifierService.onDiagramItemEdit(response => {
            let item = self._diagram.getItemById(response.itemId);
            let parentRelationOld: Relation = null;
            if (response.parentHasChanged) {
                let logic = new InheritanceLogic();
                parentRelationOld = logic.getParentRelation(self._diagram, item);
            }
            let parentRelationNew: Relation = null;
            if (response.parentRelation) {
                let parent = self._diagram.getItemById(response.parentRelation.itemIdFrom);
                if (parent) {
                    parentRelationNew = Relation.makeWithItems(response.parentRelation.id, parent, item);
                }
            }
            let methodsNew = response.methods.map(m => {
                let method = new Method(m.id);
                method.signature = m.signature;
                return method;
            });
            let action = self._actionFactory.addDiagramItemEditAction(
                response.actionId, self._diagram, item, item.title, response.itemTitle, parentRelationOld, parentRelationNew, item.methods, methodsNew);
            action.do();
            self._actionService.addAction(action);
        });

        self._apiNotifierService.onDiagramItemDelete(response => {
            let items = response.itemsId.map(id => self._diagram.getItemById(id));
            let relations = response.relationsId.map(id => self._diagram.getRelationById(id));
            let action = self._actionFactory.addDiagramItemDeleteAction(response.actionId, self._diagram, items, relations);
            action.do();
            self._actionService.addAction(action);
        });

        self._apiNotifierService.onDiagramItemSetMethods(response => {
            let item = self._diagram.getItemById(response.itemId);
            if (item) {
                item.methods = response.methods.map(m => {
                    let method = new Method(m.id);
                    method.signature = m.signature;
                    return method;
                });
            }
        });

        self._apiNotifierService.onRelationAdd(response => {
            let relations: Relation[] = response.relations.map(r => {
                let from = self._diagram.getItemById(r.itemIdFrom);
                let to = self._diagram.getItemById(r.itemIdTo);
                if (from && to) {
                    return Relation.makeWithItems(r.id, from, to);
                }
            });
            if (relations.length > 0) {
                let action = self._actionFactory.addRelationAddAction(response.actionId, self._diagram, relations);
                action.do();
                self._actionService.addAction(action);
            }
        });

        self._apiNotifierService.onRelationEdit(response => {
            let relationOld = self._diagram.getRelationById(response.relationOld.id);
            let from = self._diagram.getItemById(response.relationNew.itemIdFrom);
            let to = self._diagram.getItemById(response.relationNew.itemIdTo);
            let relationNew = Relation.makeWithItems(response.relationNew.id, from, to);
            let action = self._actionFactory.addRelationEditAction(response.actionId, self._diagram, relationOld, relationNew);
            action.do();
            self._actionService.addAction(action);
        });

        self._apiNotifierService.onRelationDelete(response => {
            let relations = response.relationsId.map(id => self._diagram.getRelationById(id));
            let action = self._actionFactory.addRelationDeleteAction(response.actionId, self._diagram, relations);
            action.do();
            self._actionService.addAction(action);
        });

        self._apiNotifierService.onActionSetActive(response => {
            let action = self._actionService.getActionById(response.actionId);
            self._actionService.updateActiveAction(action);
        });

        self._apiNotifierService.connectToDiagram(self._diagram.id);
    }
}
