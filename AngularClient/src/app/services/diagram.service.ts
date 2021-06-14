import { Injectable } from '@angular/core';
import { Point } from '../common/point';
import { Size } from '../common/size';
import { DiagramItem } from '../model/diagram-item';
import { Relation } from '../model/relation';
import { Diagram } from '../model/diagram';
import { InheritanceLogic } from '../model/inheritance-logic';
import { DiagramLayoutLogic } from '../model/diagram-layout-logic';
import { DiagramItemLayoutLogic } from '../model/diagram-item-layout-logic';
import { EditDiagramItemResult } from '../common/edit-diagram-item-result';
import { DelayedRequest } from '../common/delayed-request';
import { ApiService } from './api.service';
import { DiagramEventsService } from './diagram-events.service';
import { DiagramUpdaterService } from './diagram-updater.service';
import { ActionService } from './action.service';
import { ActionFactory } from '../common/action-factory';

@Injectable({ providedIn: 'root' })
export class DiagramService {

    private _actionFactory = new ActionFactory();
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
        let self = this;
        self._apiService.getDiagramById(id).then(response => {
            self._diagram = self.makeDiagramFromResponse(response);
            self._diagramUpdaterService.connectToDiagram(self._diagram);
            self._diagramEventsService.diagramLoadEvent.raise(self._diagram);
            self._actionService.loadDiagram(self._diagram);
        });
    }

    private makeDiagramFromResponse(response): Diagram {
        let diagram = new Diagram(response.diagram.id);
        diagram.title = response.diagram.title;
        let items = (response.diagram.items ?? []).map(i => {
            let item = new DiagramItem(i.id);
            item.title = i.title;
            item.position = new Point(i.x, i.y);
            item.size = new Size(i.width, i.height);
            return item;
        });
        diagram.addItems(items);
        let relations = (response.diagram.relations ?? []).map(r => {
            let from = diagram.getItemById(r.itemIdFrom);
            let to = diagram.getItemById(r.itemIdTo);
            let relation = new Relation(r.id);
            relation.setDiagramItems(from, to);
            return relation;
        });
        diagram.addRelations(relations);

        return diagram;
    }

    get diagram(): Diagram {
        return this._diagram;
    }

    setHandlers(): void {
        let self = this;

        let diagramSetTitleDelayedRequest = new DelayedRequest((titleNew: string) => {
            let action = self._actionFactory.makeDiagramSetTitleAction(self._diagram, self._diagram.title, titleNew);
            action.do();
            self._actionService.addAction(action);
            self._apiService.diagramSetTitle(action, self._diagram);
        }, 2000);
        self._diagramEventsService.diagramSetTitleEvent.addHandler((titleNew: string) => {
            diagramSetTitleDelayedRequest.send(titleNew);
        });

        self._diagramEventsService.diagramLayoutEvent.addHandler((diagram: Diagram) => {
            let itemsOld = diagram.items.map(i => i.getState({ position: true }));
            let layoutLogic = new DiagramLayoutLogic();
            let layoutResult = layoutLogic.layoutDiagram(diagram);
            let action = self._actionFactory.makeDiagramLayoutAction(self._diagram, itemsOld, layoutResult.items);
            action.do();
            self._actionService.addAction(action);
            self._apiService.diagramLayout(action, diagram);
        });

        self._diagramEventsService.diagramItemMoveEvent.addHandler((args) => {
            let action = self._actionFactory.makeDiagramItemMoveAction(self._diagram, args.item, args.startPosition, args.item.position);
            action.do();
            self._actionService.addAction(action);
            self._apiService.diagramItemMove(action, self._diagram, args.item);
        });

        self._diagramEventsService.diagramItemResizeEvent.addHandler((args) => {
            let action = self._actionFactory.makeDiagramItemResizeAction(self._diagram, args.item, args.startPosition, args.startSize, args.item.position, args.item.size);
            action.do();
            self._actionService.addAction(action);
            self._apiService.diagramItemResize(action, self._diagram, args.item);
        });

        self._diagramEventsService.diagramItemSetTitleEvent.addHandler((args) => {
            let action = self._actionFactory.makeDiagramItemSetTitleAction(self._diagram, args.item, args.item.title, args.titleNew);
            action.do();
            self._actionService.addAction(action);
            self._apiService.diagramItemSetTitle(action, self._diagram, args.item);
        });

        self._diagramEventsService.diagramItemAddEvent.addHandler((result: EditDiagramItemResult) => {
            let item = new DiagramItem();
            item.size = new Size(120, 160);
            let layoutLogic = new DiagramItemLayoutLogic();
            let initPosition = layoutLogic.getInitialItemPosition(self._diagram, item, result.parentNew);
            item.position = new Point(initPosition.x, initPosition.y);
            item.title = result.titleNew;
            let parentRelation: Relation = null;
            if (result.parentNew) {
                parentRelation = new Relation();
                parentRelation.setDiagramItems(result.parentNew, item);
            }
            if (result.methodsNew.length > 0) {
                item.addMethods(result.methodsNew);
            }
            let action = self._actionFactory.makeDiagramItemAddAction(self._diagram, item, parentRelation);
            action.do();
            self._actionService.addAction(action);
            self._apiService.diagramItemAdd(action, self._diagram, item, parentRelation, result.methodsNew);
        });

        self._diagramEventsService.diagramItemEditEvent.addHandler((result: EditDiagramItemResult) => {
            let item = result.item;
            let parentRelationOld: Relation = null;
            let parentRelationNew: Relation = null;
            if (result.parentHasChanged) {
                let logic = new InheritanceLogic();
                parentRelationOld = logic.getParentRelation(self._diagram, item);
                if (result.parentNew) {
                    parentRelationNew = new Relation();
                    parentRelationNew.setDiagramItems(result.parentNew, item);
                }
            }
            if (result.titleHasChanged && !result.parentHasChanged && !result.methodsHasChanged) {
                let action = self._actionFactory.makeDiagramItemSetTitleAction(self._diagram, item, result.titleOld, result.titleNew);
                action.do();
                self._actionService.addAction(action);
                self._apiService.diagramItemSetTitle(action, self._diagram, item);
            } else if (result.parentHasChanged && result.parentOld == null && result.parentNew != null && !result.titleHasChanged && !result.methodsHasChanged) {
                let action = self._actionFactory.makeRelationAddAction(self._diagram, [parentRelationNew]);
                action.do();
                self._actionService.addAction(action);
                self._apiService.relationAdd(action, self._diagram, [parentRelationNew]);
            } else if (result.parentHasChanged && result.parentOld != null && result.parentNew != null && !result.titleHasChanged && !result.methodsHasChanged) {
                let action = self._actionFactory.makeRelationEditAction(self._diagram, parentRelationOld, parentRelationNew);
                action.do();
                self._actionService.addAction(action);
                self._apiService.relationEdit(action, self._diagram, parentRelationOld, parentRelationNew);
            } else if (result.parentHasChanged && result.parentOld != null && result.parentNew == null && !result.titleHasChanged && !result.methodsHasChanged) {
                let action = self._actionFactory.makeRelationDeleteAction(self._diagram, [parentRelationOld]);
                action.do();
                self._actionService.addAction(action);
                self._apiService.relationDelete(action, self._diagram, [parentRelationOld]);
            } else {
                let action = self._actionFactory.makeDiagramItemEditAction(
                    self._diagram, item, result.titleOld, result.titleNew, parentRelationOld, parentRelationNew, result.methodsOld, result.methodsNew);
                action.do();
                self._actionService.addAction(action);
                self._apiService.diagramItemEdit(action, self._diagram, item, result.parentHasChanged, parentRelationNew, result.methodsNew);
            }
        });

        self._diagramEventsService.diagramItemDeleteEvent.addHandler((diagramItems: DiagramItem[]) => {
            diagramItems.forEach(i => i.isSelected = false);
            let relations = diagramItems.map(i => self._diagram.getItemRelations(i)).reduce((x, y) => x.concat(y), []); // flat array
            let relationsDistinct = Array.from(new Set(relations));
            let action = self._actionFactory.makeDiagramItemDeleteAction(self._diagram, diagramItems, relationsDistinct);
            action.do();
            self._actionService.addAction(action);
            self._apiService.diagramItemDelete(action, self._diagram, diagramItems, relationsDistinct);
        });

        self._diagramEventsService.relationAddEvent.addHandler((relations: Relation[]) => {
            let action = self._actionFactory.makeRelationAddAction(self._diagram, relations);
            action.do();
            self._actionService.addAction(action);
            self._apiService.relationAdd(action, self._diagram, relations);
        });

        self._diagramEventsService.relationDeleteEvent.addHandler((relations: Relation[]) => {
            relations.forEach(i => i.isSelected = false);
            let action = self._actionFactory.makeRelationDeleteAction(self._diagram, relations);
            action.do();
            self._actionService.addAction(action);
            self._apiService.relationDelete(action, self._diagram, relations);
        });
    }
}
