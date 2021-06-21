import { Injectable } from '@angular/core';
import { Point } from '../common/point';
import { Size } from '../common/size';
import { DiagramItem } from '../model/diagram-item';
import { Relation } from '../model/relation';
import { Method } from '../model/method';
import { Diagram } from '../model/diagram';
import { InheritanceLogic } from '../model/inheritance-logic';
import { DiagramLayoutLogic } from '../model/diagram-layout-logic';
import { DiagramItemLayoutLogic } from '../model/diagram-item-layout-logic';
import { EditDiagramItemResult } from '../common/edit-diagram-item-result';
import { DelayedRequest } from '../common/delayed-request';
import { ApiService } from './api.service';
import { DiagramEventsService } from './diagram-events.service';
import { DiagramUpdaterService } from './diagram-updater.service';
import { Action } from '../common/action';
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
        this.loadDiagramById('12345');
    }

    get diagram(): Diagram { return this._diagram; }

    loadDiagramById(id: string): void {
        let self = this;
        self._apiService.getDiagramById(id).then(response => {
            self._diagram = self.makeDiagramFromResponse(response);
            self._diagramUpdaterService.connectToDiagram(self._diagram);
            self._diagramEventsService.diagramLoadEvent.raise(self._diagram);
            self._actionService.loadDiagram(self._diagram);
            let actions = this.makeActionsFromResponse(response);
            self._actionService.addActions(actions);
            if (response.activeActionId) {
                let activeAction = self._actionService.getActionById(response.activeActionId);
                self._actionService.setActiveAction(activeAction);
            }
        });
    }

    private makeDiagramFromResponse(response): Diagram {
        let diagram = new Diagram(response.diagram.id);
        diagram.title = response.diagram.title;
        let items = (response.diagram.items ?? []).map(i => DiagramItem.makeFromObject(i));
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

    private makeActionsFromResponse(response): Action[] {
        let self = this;
        return response.actions.map(responseAction => {
            let action: Action = null;
            if (responseAction.type === 'DiagramItemAddAction') {
                let item = self.diagram.getItemById(responseAction.item.id) ?? DiagramItem.makeFromObject(responseAction.item);
                let parentRelation: Relation = null;
                if (responseAction.parentRelation) {
                    let parentItem = self.diagram.getItemById(responseAction.parentItem.id) ?? DiagramItem.makeFromObject(responseAction.parentItem);
                    parentRelation = self.diagram.getRelationById(responseAction.parentRelation.id);
                    if (!parentRelation) {
                        parentRelation = new Relation(responseAction.parentRelation.id);
                        parentRelation.setDiagramItems(parentItem, item);
                    }
                }
                action = self._actionFactory.addDiagramItemAddAction(responseAction.id, self.diagram, item, parentRelation);
            } else if (responseAction.type === 'DiagramItemDeleteAction') {
                let items: DiagramItem[] = responseAction.items.map(responseItem => self.diagram.getItemById(responseItem.id) ?? DiagramItem.makeFromObject(responseItem));
                let itemsForRelations: DiagramItem[] = [];
                let relations = responseAction.relations.map(responseRelation => {
                    let from = self.diagram.getItemById(responseRelation.itemIdFrom)
                        ?? items.find(x => x.id === responseRelation.itemIdFrom)
                        ?? itemsForRelations.find(x => x.id === responseRelation.itemIdFrom);
                    if (!from) {
                        from = DiagramItem.makeFromObject(responseRelation.itemFrom);
                        itemsForRelations.push(from);
                    }
                    let to = self.diagram.getItemById(responseRelation.itemIdTo)
                        ?? items.find(x => x.id === responseRelation.itemIdTo)
                        ?? itemsForRelations.find(x => x.id === responseRelation.itemIdTo);
                    if (!to) {
                        to = DiagramItem.makeFromObject(responseRelation.itemTo);
                        itemsForRelations.push(to);
                    }
                    let relation = new Relation(responseRelation.id);
                    relation.setDiagramItems(from, to);
                    return relation;
                });
                action = self._actionFactory.addDiagramItemDeleteAction(responseAction.id, self.diagram, items, relations);
            } else if (responseAction.type === 'DiagramItemEditAction') {
                let item = self.diagram.getItemById(responseAction.itemId) ?? DiagramItem.makeFromObject(responseAction.item);
                let parentRelationOld: Relation;
                let parentRelationNew: Relation;
                if (responseAction.parentRelationOld) {
                    let parentItem = self.diagram.getItemById(responseAction.parentRelationOld.itemFromId) ?? DiagramItem.makeFromObject(responseAction.parentRelationOld.itemFrom);
                    parentRelationOld = new Relation(responseAction.parentRelationOld.id);
                    parentRelationOld.setDiagramItems(parentItem, item);
                }
                if (responseAction.parentRelationNew) {
                    let parentItem = self.diagram.getItemById(responseAction.parentRelationNew.itemFromId) ?? DiagramItem.makeFromObject(responseAction.parentRelationNew.itemFrom);
                    parentRelationNew = self.diagram.getRelationById(responseAction.parentRelationNew.id);
                    if (!parentRelationNew) {
                        parentRelationNew = new Relation(responseAction.parentRelationNew.id);
                        parentRelationNew.setDiagramItems(parentItem, item);
                    }
                }
                action = self._actionFactory.addDiagramItemEditAction(
                    responseAction.id,
                    self.diagram,
                    item,
                    responseAction.titleOld,
                    responseAction.titleNew,
                    parentRelationOld,
                    parentRelationNew,
                    responseAction.methodsOld,
                    responseAction.methodsNew);
            } else if (responseAction.type === 'DiagramItemMoveAction') {
                let item = self.diagram.getItemById(responseAction.item.id) ?? DiagramItem.makeFromObject(responseAction.item);
                let positionOld = new Point(responseAction.positionXOld, responseAction.positionYOld);
                let positionNew = new Point(responseAction.positionXNew, responseAction.positionYNew);
                action = self._actionFactory.addDiagramItemMoveAction(responseAction.id, self.diagram, item, positionOld, positionNew);
            } else if (responseAction.type === 'DiagramItemResizeAction') {
                let item = self.diagram.getItemById(responseAction.item.id) ?? DiagramItem.makeFromObject(responseAction.item);
                let positionOld = new Point(responseAction.positionXOld, responseAction.positionYOld);
                let sizeOld = new Size(responseAction.sizeWidthOld, responseAction.sizeHeightOld);
                let positionNew = new Point(responseAction.positionXNew, responseAction.positionYNew);
                let sizeNew = new Size(responseAction.sizeWidthNew, responseAction.sizeHeightNew);
                action = self._actionFactory.addDiagramItemResizeAction(responseAction.id, self.diagram, item, positionOld, sizeOld, positionNew, sizeNew);
            } else if (responseAction.type === 'DiagramItemSetTitleAction') {
                let item = self.diagram.getItemById(responseAction.item.id) ?? DiagramItem.makeFromObject(responseAction.item);
                action = self._actionFactory.addDiagramItemSetTitleAction(responseAction.id, self.diagram, item, responseAction.titleOld, responseAction.titleNew);
            } else if (responseAction.type === 'DiagramLayoutAction') {
                let itemsOld = responseAction.layoutItemsOld.map(i => {
                    return { id: i.id, position: new Point(i.x, i.y), size: new Size(i.width, i.height) };
                });
                let itemsNew = responseAction.layoutItemsNew.map(i => {
                    return { id: i.id, position: new Point(i.x, i.y), size: new Size(i.width, i.height) };
                });
                action = self._actionFactory.addDiagramLayoutAction(responseAction.id, self.diagram, itemsOld, itemsNew);
            } else if (responseAction.type === 'DiagramSetTitleAction') {
                action = self._actionFactory.addDiagramSetTitleAction(responseAction.id, self.diagram, responseAction.titleOld, responseAction.titleNew);
            } else if (responseAction.type === 'RelationAddAction') {
                let itemsForRelations: DiagramItem[] = [];
                let relations = responseAction.relations.map(responseRelation => {
                    let relation = self.diagram.getRelationById(responseRelation.id);
                    if (!relation) {
                        let from = self.diagram.getItemById(responseRelation.itemIdFrom) ?? itemsForRelations.find(x => x.id === responseRelation.itemIdFrom);
                        if (!from) {
                            from = DiagramItem.makeFromObject(responseRelation.itemFrom);
                            itemsForRelations.push(from);
                        }
                        let to = self.diagram.getItemById(responseRelation.itemIdTo) ?? itemsForRelations.find(x => x.id === responseRelation.itemIdTo);
                        if (!to) {
                            to = DiagramItem.makeFromObject(responseRelation.itemTo);
                            itemsForRelations.push(to);
                        }
                        relation = new Relation(responseRelation.id);
                        relation.setDiagramItems(from, to);
                    }
                    return relation;
                });
                action = self._actionFactory.addRelationAddAction(responseAction.id, self.diagram, relations);
            } else if (responseAction.type === 'RelationDeleteAction') {
                let itemsForRelations: DiagramItem[] = [];
                let relations = responseAction.relations.map(responseRelation => {
                    let from = self.diagram.getItemById(responseRelation.itemIdFrom) ?? itemsForRelations.find(x => x.id === responseRelation.itemIdFrom);
                    if (!from) {
                        from = DiagramItem.makeFromObject(responseRelation.itemFrom);
                        itemsForRelations.push(from);
                    }
                    let to = self.diagram.getItemById(responseRelation.itemIdTo) ?? itemsForRelations.find(x => x.id === responseRelation.itemIdTo);
                    if (!to) {
                        to = DiagramItem.makeFromObject(responseRelation.itemTo);
                        itemsForRelations.push(to);
                    }
                    let relation = new Relation(responseRelation.id);
                    relation.setDiagramItems(from, to);
                    return relation;
                });
                action = self._actionFactory.addRelationDeleteAction(responseAction.id, self.diagram, relations);
            } else if (responseAction.type === 'RelationEditAction') {
                let itemsForRelations: DiagramItem[] = [];

                let from = self.diagram.getItemById(responseAction.relationOld.itemIdFrom) ?? itemsForRelations.find(x => x.id === responseAction.relationOld.itemIdFrom);
                if (!from) {
                    from = DiagramItem.makeFromObject(responseAction.relationOld.itemFrom);
                    itemsForRelations.push(from);
                }
                let to = self.diagram.getItemById(responseAction.relationOld.itemIdTo) ?? itemsForRelations.find(x => x.id === responseAction.relationOld.itemIdTo);
                if (!to) {
                    to = DiagramItem.makeFromObject(responseAction.relationOld.itemTo);
                    itemsForRelations.push(to);
                }
                let relationOld = new Relation(responseAction.relationOld.id);
                relationOld.setDiagramItems(from, to);

                let relationNew = self.diagram.getRelationById(responseAction.relationNew.id);
                if (!relationNew) {
                    from = self.diagram.getItemById(responseAction.relationNew.itemIdFrom) ?? itemsForRelations.find(x => x.id === responseAction.relationNew.itemIdFrom);
                    if (!from) {
                        from = DiagramItem.makeFromObject(responseAction.relationNew.itemFrom);
                    }
                    to = self.diagram.getItemById(responseAction.relationNew.itemIdTo) ?? itemsForRelations.find(x => x.id === responseAction.relationNew.itemIdTo);
                    if (!to) {
                        to = DiagramItem.makeFromObject(responseAction.relationNew.itemTo);
                    }
                    relationNew = new Relation(responseAction.relationNew.id);
                    relationNew.setDiagramItems(from, to);
                }
                action = self._actionFactory.addRelationEditAction(responseAction.id, self.diagram, relationOld, relationNew);
            }

            if (action) action.isActive = true;

            return action;
        }).filter(x => x != null);
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
