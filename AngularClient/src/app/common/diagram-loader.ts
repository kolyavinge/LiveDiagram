import { Point } from '../common/point';
import { Size } from '../common/size';
import { DiagramItem } from '../model/diagram-item';
import { Relation } from '../model/relation';
import { Diagram } from '../model/diagram';
import { Action } from '../common/action';
import { ActionFactory } from './action-factory';

export class DiagramLoader {

    constructor(private _actionFactory: ActionFactory) {
    }

    public makeDiagram(response): Diagram {
        let diagram = new Diagram(response.diagram.id);
        diagram.title = response.diagram.title;
        let items = (response.diagram.items ?? []).map(i => DiagramItem.makeFromObject(i));
        diagram.addItems(items);
        let relations = (response.diagram.relations ?? []).map(r => {
            let from = diagram.getItemById(r.itemIdFrom);
            let to = diagram.getItemById(r.itemIdTo);
            return Relation.makeWithItems(r.id, from, to);
        });
        diagram.addRelations(relations);

        return diagram;
    }

    public makeActions(diagram: Diagram, response): Action[] {
        let actions = response.actions.map(action => this.makeAction(diagram, action)).filter(x => x != null);
        actions.forEach(x => x.isActive = true);
        return actions;
    }

    private makeAction(diagram: Diagram, response): Action {
        if (response.type === 'DiagramItemAddAction') {
            let item = diagram.getItemById(response.item.id) ?? DiagramItem.makeFromObject(response.item);
            let parentRelation: Relation = null;
            if (response.parentRelation) {
                let parentItem = diagram.getItemById(response.parentRelation.itemFromId) ?? DiagramItem.makeFromObject(response.parentRelation.itemFrom);
                parentRelation = diagram.getRelationById(response.parentRelation.id);
                if (!parentRelation) {
                    parentRelation = Relation.makeWithItems(response.parentRelation.id, parentItem, item);
                }
            }
            return this._actionFactory.addDiagramItemAddAction(response.id, diagram, item, parentRelation);
        } else if (response.type === 'DiagramItemDeleteAction') {
            let items: DiagramItem[] = response.items.map(responseItem => diagram.getItemById(responseItem.id) ?? DiagramItem.makeFromObject(responseItem));
            let itemsForRelations: DiagramItem[] = [];
            let relations = response.relations.map(responseRelation => {
                let from = diagram.getItemById(responseRelation.itemIdFrom)
                    ?? items.find(x => x.id === responseRelation.itemIdFrom)
                    ?? itemsForRelations.find(x => x.id === responseRelation.itemIdFrom);
                if (!from) {
                    from = DiagramItem.makeFromObject(responseRelation.itemFrom);
                    itemsForRelations.push(from);
                }
                let to = diagram.getItemById(responseRelation.itemIdTo)
                    ?? items.find(x => x.id === responseRelation.itemIdTo)
                    ?? itemsForRelations.find(x => x.id === responseRelation.itemIdTo);
                if (!to) {
                    to = DiagramItem.makeFromObject(responseRelation.itemTo);
                    itemsForRelations.push(to);
                }
                return Relation.makeWithItems(responseRelation.id, from, to);
            });
            return this._actionFactory.addDiagramItemDeleteAction(response.id, diagram, items, relations);
        } else if (response.type === 'DiagramItemEditAction') {
            let item = diagram.getItemById(response.itemId) ?? DiagramItem.makeFromObject(response.item);
            let parentRelationOld: Relation;
            let parentRelationNew: Relation;
            if (response.parentRelationOld) {
                let parentItem = diagram.getItemById(response.parentRelationOld.itemFromId) ?? DiagramItem.makeFromObject(response.parentRelationOld.itemFrom);
                parentRelationOld = Relation.makeWithItems(response.parentRelationOld.id, parentItem, item);
            }
            if (response.parentRelationNew) {
                let parentItem = diagram.getItemById(response.parentRelationNew.itemFromId) ?? DiagramItem.makeFromObject(response.parentRelationNew.itemFrom);
                parentRelationNew = diagram.getRelationById(response.parentRelationNew.id);
                if (!parentRelationNew) {
                    parentRelationNew = Relation.makeWithItems(response.parentRelationNew.id, parentItem, item);
                }
            }
            return this._actionFactory.addDiagramItemEditAction(
                response.id, diagram, item, response.titleOld, response.titleNew, parentRelationOld, parentRelationNew, response.methodsOld, response.methodsNew);
        } else if (response.type === 'DiagramItemMoveAction') {
            let item = diagram.getItemById(response.item.id) ?? DiagramItem.makeFromObject(response.item);
            let positionOld = new Point(response.positionXOld, response.positionYOld);
            let positionNew = new Point(response.positionXNew, response.positionYNew);
            return this._actionFactory.addDiagramItemMoveAction(response.id, diagram, item, positionOld, positionNew);
        } else if (response.type === 'DiagramItemResizeAction') {
            let item = diagram.getItemById(response.item.id) ?? DiagramItem.makeFromObject(response.item);
            let positionOld = new Point(response.positionXOld, response.positionYOld);
            let sizeOld = new Size(response.sizeWidthOld, response.sizeHeightOld);
            let positionNew = new Point(response.positionXNew, response.positionYNew);
            let sizeNew = new Size(response.sizeWidthNew, response.sizeHeightNew);
            return this._actionFactory.addDiagramItemResizeAction(response.id, diagram, item, positionOld, sizeOld, positionNew, sizeNew);
        } else if (response.type === 'DiagramItemSetTitleAction') {
            let item = diagram.getItemById(response.item.id) ?? DiagramItem.makeFromObject(response.item);
            return this._actionFactory.addDiagramItemSetTitleAction(response.id, diagram, item, response.titleOld, response.titleNew);
        } else if (response.type === 'DiagramLayoutAction') {
            let itemsOld = response.layoutItemsOld.map(i => ({ id: i.id, position: new Point(i.x, i.y), size: new Size(i.width, i.height) }));
            let itemsNew = response.layoutItemsNew.map(i => ({ id: i.id, position: new Point(i.x, i.y), size: new Size(i.width, i.height) }));
            return this._actionFactory.addDiagramLayoutAction(response.id, diagram, itemsOld, itemsNew);
        } else if (response.type === 'DiagramSetTitleAction') {
            return this._actionFactory.addDiagramSetTitleAction(response.id, diagram, response.titleOld, response.titleNew);
        } else if (response.type === 'RelationAddAction') {
            let itemsForRelations: DiagramItem[] = [];
            let relations = response.relations.map(responseRelation => {
                let relation = diagram.getRelationById(responseRelation.id);
                if (!relation) {
                    let from = diagram.getItemById(responseRelation.itemIdFrom) ?? itemsForRelations.find(x => x.id === responseRelation.itemIdFrom);
                    if (!from) {
                        from = DiagramItem.makeFromObject(responseRelation.itemFrom);
                        itemsForRelations.push(from);
                    }
                    let to = diagram.getItemById(responseRelation.itemIdTo) ?? itemsForRelations.find(x => x.id === responseRelation.itemIdTo);
                    if (!to) {
                        to = DiagramItem.makeFromObject(responseRelation.itemTo);
                        itemsForRelations.push(to);
                    }
                    relation = Relation.makeWithItems(responseRelation.id, from, to);
                }
                return relation;
            });
            return this._actionFactory.addRelationAddAction(response.id, diagram, relations);
        } else if (response.type === 'RelationDeleteAction') {
            let itemsForRelations: DiagramItem[] = [];
            let relations = response.relations.map(responseRelation => {
                let from = diagram.getItemById(responseRelation.itemIdFrom) ?? itemsForRelations.find(x => x.id === responseRelation.itemIdFrom);
                if (!from) {
                    from = DiagramItem.makeFromObject(responseRelation.itemFrom);
                    itemsForRelations.push(from);
                }
                let to = diagram.getItemById(responseRelation.itemIdTo) ?? itemsForRelations.find(x => x.id === responseRelation.itemIdTo);
                if (!to) {
                    to = DiagramItem.makeFromObject(responseRelation.itemTo);
                    itemsForRelations.push(to);
                }
                return Relation.makeWithItems(responseRelation.id, from, to);
            });
            return this._actionFactory.addRelationDeleteAction(response.id, diagram, relations);
        } else if (response.type === 'RelationEditAction') {
            let itemsForRelations: DiagramItem[] = [];
            let from = diagram.getItemById(response.relationOld.itemIdFrom) ?? itemsForRelations.find(x => x.id === response.relationOld.itemIdFrom);
            if (!from) {
                from = DiagramItem.makeFromObject(response.relationOld.itemFrom);
                itemsForRelations.push(from);
            }
            let to = diagram.getItemById(response.relationOld.itemIdTo) ?? itemsForRelations.find(x => x.id === response.relationOld.itemIdTo);
            if (!to) {
                to = DiagramItem.makeFromObject(response.relationOld.itemTo);
                itemsForRelations.push(to);
            }
            let relationOld = Relation.makeWithItems(response.relationOld.id, from, to);
            let relationNew = diagram.getRelationById(response.relationNew.id);
            if (!relationNew) {
                from = diagram.getItemById(response.relationNew.itemIdFrom) ?? itemsForRelations.find(x => x.id === response.relationNew.itemIdFrom);
                if (!from) {
                    from = DiagramItem.makeFromObject(response.relationNew.itemFrom);
                }
                to = diagram.getItemById(response.relationNew.itemIdTo) ?? itemsForRelations.find(x => x.id === response.relationNew.itemIdTo);
                if (!to) {
                    to = DiagramItem.makeFromObject(response.relationNew.itemTo);
                }
                relationNew = Relation.makeWithItems(response.relationNew.id, from, to);
            }
            return this._actionFactory.addRelationEditAction(response.id, diagram, relationOld, relationNew);
        }

        return null;
    }
}
