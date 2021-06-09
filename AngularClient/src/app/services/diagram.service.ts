import { Injectable } from '@angular/core';
import { DiagramItem, DiagramItemState } from '../model/diagram-item';
import { Relation } from '../model/relation';
import { Diagram } from '../model/diagram';
import { InheritanceLogic } from '../model/inheritance-logic';
import { DiagramLayoutLogic } from '../model/diagram-layout-logic';
import { DiagramItemLayoutLogic } from '../model/diagram-item-layout-logic';
import { EditDiagramItemResult } from '../contracts/edit-diagram-item-result';
import { DelayedRequest } from '../infrastructure/delayed-request';
import { ApiService } from './api.service';
import { DiagramEventsService } from './diagram-events.service';
import { DiagramUpdaterService } from './diagram-updater.service';
import { ActionService } from './action.service';
import { DiagramItemAddAction } from '../actions/diagram-item-add-action';
import { DiagramItemEditAction } from '../actions/diagram-item-edit-action';
import { DiagramItemDeleteAction } from '../actions/diagram-item-delete-action';
import { DiagramItemMoveAction } from '../actions/diagram-item-move-action';
import { DiagramItemResizeAction } from '../actions/diagram-item-resize-action';
import { RelationAddAction } from '../actions/relation-add-action';
import { RelationDeleteAction } from '../actions/relation-delete-action';

@Injectable({ providedIn: 'root' })
export class DiagramService {

    private _diagram: Diagram;

    constructor(
        private _apiService: ApiService,
        private _diagramEventsService: DiagramEventsService,
        private _diagramUpdaterService: DiagramUpdaterService,
        private _actionService: ActionService
    ) {
        this.setHandlers();
        this._diagram = new Diagram();
        this.loadDiagramById("12345");
    }

    loadDiagramById(id: string): void {
        var self = this;
        self._apiService.getDiagramById(id).then(response => {
            self._diagram = self.makeDiagramFromResponse(response);
            self._diagramUpdaterService.connectToDiagram(self._diagram);
            self._diagramEventsService.diagramLoadedEvent.raise(self._diagram);
            self._actionService.clearActions();
        });
    }

    private makeDiagramFromResponse(response): Diagram {
        var diagram = new Diagram(response.diagram.id);
        diagram.title = response.diagram.title;
        (response.diagram.items ?? []).forEach(i => {
            var item = new DiagramItem(i.id);
            item.title = i.title;
            item.setPosition(i.x, i.y);
            item.setSize(i.width, i.height);
            diagram.addItems([item]);
        });
        (response.diagram.relations ?? []).forEach(r => {
            var from = diagram.getItemById(r.itemIdFrom);
            var to = diagram.getItemById(r.itemIdTo);
            var relation = new Relation(r.id);
            relation.setDiagramItems(from, to);
            diagram.addRelations([relation]);
        });

        return diagram;
    }

    get diagram(): Diagram {
        return this._diagram;
    }

    setHandlers(): void {
        var self = this;

        var diagramSetTitleDelayedRequest = new DelayedRequest(() => { self._apiService.diagramSetTitle(self._diagram); }, 2000);
        self._diagramEventsService.diagramSetTitleEvent.addHandler(() => {
            diagramSetTitleDelayedRequest.send();
        });

        self._diagramEventsService.diagramLayoutEvent.addHandler((diagram: Diagram) => {
            var layoutLogic = new DiagramLayoutLogic();
            var result = layoutLogic.layoutDiagram(diagram);
            var updatedItems: DiagramItemState[] = result.items.map(layoutItem => {
                return { id: layoutItem.item.id, position: layoutItem.position };
            });
            self._diagram.updateItems(updatedItems);
            self._apiService.diagramLayout(diagram);
        });

        self._diagramEventsService.diagramItemMoveEvent.addHandler((args) => {
            var action = new DiagramItemMoveAction(null, self._diagram, args.item, args.startPosition, args.item.position);
            action.do();
            self._actionService.addAction(action);
            self._apiService.diagramItemMove(action, self._diagram, args.item);
        });

        self._diagramEventsService.diagramItemResizeEvent.addHandler((args) => {
            var action = new DiagramItemResizeAction(
                null, self._diagram, args.item, args.startPosition, args.startSize, args.item.position, args.item.size);
            action.do();
            self._actionService.addAction(action);
            self._apiService.diagramItemResize(action, self._diagram, args.item);
        });

        self._diagramEventsService.diagramItemSetTitleEvent.addHandler((diagramItem: DiagramItem) => {
            self._apiService.diagramItemSetTitle(self._diagram, diagramItem);
        });

        self._diagramEventsService.diagramItemAddEvent.addHandler((result: EditDiagramItemResult) => {
            var item = new DiagramItem();
            item.setSize(120, 160);
            var layoutLogic = new DiagramItemLayoutLogic();
            var initPosition = layoutLogic.getInitialItemPosition(self._diagram, item, result.parentNew);
            item.setPosition(initPosition.x, initPosition.y);
            item.title = result.titleNew;
            var parentRelation: Relation = null;
            if (result.parentNew) {
                parentRelation = new Relation();
                parentRelation.setDiagramItems(result.parentNew, item);
            }
            if (result.methodsNew.length > 0) {
                item.addMethods(result.methodsNew);
            }
            var action = new DiagramItemAddAction(null, self._diagram, item, parentRelation);
            action.do();
            self._actionService.addAction(action);
            self._apiService.diagramItemAdd(action, self._diagram, item, parentRelation, result.methodsNew);
        });

        self._diagramEventsService.diagramItemEditEvent.addHandler((result: EditDiagramItemResult) => {
            var item = result.item;
            if (result.parentHasChanged) {
                var logic = new InheritanceLogic();
                var parentRelationOld = logic.getParentRelation(self._diagram, item);
                if (result.parentNew) {
                    var parentRelationNew = new Relation();
                    parentRelationNew.setDiagramItems(result.parentNew, item);
                }
            }
            var action = new DiagramItemEditAction(
                null, self._diagram, item, result.titleOld, result.titleNew, parentRelationOld, parentRelationNew, result.methodsOld, result.methodsNew);
            action.do();
            self._actionService.addAction(action);
            self._apiService.diagramItemEdit(action, self._diagram, item, result.parentHasChanged, parentRelationNew, result.methodsNew);
        });

        self._diagramEventsService.diagramItemDeleteEvent.addHandler((diagramItems: DiagramItem[]) => {
            diagramItems.forEach(i => i.isSelected = false);
            var relations = diagramItems.map(i => self._diagram.getItemRelations(i)).reduce((x, y) => x.concat(y), []); // flat array
            var relationsDistinct = Array.from(new Set(relations));
            var action = new DiagramItemDeleteAction(null, self._diagram, diagramItems, relationsDistinct);
            action.do();
            self._actionService.addAction(action);
            self._apiService.diagramItemDelete(action, self._diagram, diagramItems, relationsDistinct);
        });

        self._diagramEventsService.relationAddEvent.addHandler((relations: Relation[]) => {
            var action = new RelationAddAction(null, self._diagram, relations);
            action.do();
            self._actionService.addAction(action);
            self._apiService.relationAdd(action, self._diagram, relations);
        });

        self._diagramEventsService.relationDeleteEvent.addHandler((relations: Relation[]) => {
            relations.forEach(i => i.isSelected = false);
            var action = new RelationDeleteAction(null, self._diagram, relations);
            action.do();
            self._actionService.addAction(action);
            self._apiService.relationDelete(action, self._diagram, relations);
        });
    }
}
