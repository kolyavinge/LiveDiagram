import { Point, Size } from '../common/geometry';
import { DiagramItem } from '../model/diagram-item';
import { Relation } from '../model/relation';
import { Diagram } from '../model/diagram';
import { Action } from '../common/action';
import { ActionFactory } from './action-factory';
import { Method } from '../model/method';
import { InheritanceLogic } from '../model/inheritance-logic';

export class ActionLoader {

    private _actionFactory = new ActionFactory();

    makeActions(diagram: Diagram, response): Action[] {
        let actionDictionary = {
            DiagramItemAddAction: this.addDiagramItemAddAction,
            DiagramItemDeleteAction: this.addDiagramItemDeleteAction,
            DiagramItemEditAction: this.addDiagramItemEditAction,
            DiagramItemMoveAction: this.addDiagramItemMoveAction,
            DiagramItemResizeAction: this.addDiagramItemResizeAction,
            DiagramItemSetTitleAction: this.addDiagramItemSetTitleAction,
            DiagramLayoutAction: this.addDiagramLayoutAction,
            DiagramSetTitleAction: this.addDiagramSetTitleAction,
            RelationAddAction: this.addRelationAddAction,
            RelationDeleteAction: this.addRelationDeleteAction,
            RelationEditAction: this.addRelationEditAction
        };

        return response.actions
            .filter(action => actionDictionary[action.type])
            .map(action => actionDictionary[action.type].call(this, diagram, action));
    }

    addDiagramItemAddAction(diagram: Diagram, response): Action {
        let item = DiagramItem.makeFromObject(response.item);
        let parentRelation: Relation = null;
        if (response.parentRelation) {
            let parent = diagram.getItemById(response.parentRelation.itemIdFrom);
            if (parent) {
                parentRelation = Relation.makeWithItems(response.parentRelation.id, parent, item);
            }
        }
        return this._actionFactory.addDiagramItemAddAction(response.actionId, diagram, item, parentRelation);
    }

    addDiagramItemDeleteAction(diagram: Diagram, response): Action {
        let items = response.itemsId.map(id => diagram.getItemById(id));
        let relations = response.relationsId.map(id => diagram.getRelationById(id));
        return this._actionFactory.addDiagramItemDeleteAction(response.actionId, diagram, items, relations);
    }

    addDiagramItemEditAction(diagram: Diagram, response): Action {
        let item = diagram.getItemById(response.itemId);
        let parentRelationOld: Relation = null;
        if (response.parentHasChanged) {
            let logic = new InheritanceLogic();
            parentRelationOld = logic.getParentRelation(diagram, item);
        }
        let parentRelationNew: Relation = null;
        if (response.parentRelation) {
            let parent = diagram.getItemById(response.parentRelation.itemIdFrom);
            if (parent) {
                parentRelationNew = Relation.makeWithItems(response.parentRelation.id, parent, item);
            }
        }
        let methodsNew = response.methods.map(m => {
            let method = new Method(m.id);
            method.signature = m.signature;
            return method;
        });
        return this._actionFactory.addDiagramItemEditAction(
            response.actionId, diagram, item, item.title, response.itemTitle, parentRelationOld, parentRelationNew, item.methods, methodsNew);
    }

    addDiagramItemMoveAction(diagram: Diagram, response): Action {
        let items = response.items.map(i => {
            let movedItem = diagram.getItemById(i.id);
            return { item: movedItem, positionOld: movedItem.position, positionNew: new Point(i.x, i.y) };
        });
        return this._actionFactory.addDiagramItemMoveAction(response.actionId, diagram, items);
    }

    addDiagramItemResizeAction(diagram: Diagram, response): Action {
        let items = response.items.map(i => {
            let item = diagram.getItemById(i.id);
            return {
                item: item,
                positionOld: item.position,
                sizeOld: item.size,
                positionNew: new Point(i.x, i.y),
                sizeNew: new Size(i.width, i.height)
            };
        });
        return this._actionFactory.addDiagramItemResizeAction(response.actionId, diagram, items);
    }

    addDiagramItemSetTitleAction(diagram: Diagram, response): Action {
        let item = diagram.getItemById(response.itemId);
        return this._actionFactory.addDiagramItemSetTitleAction(response.actionId, diagram, item, item.title, response.itemTitle);
    }

    addDiagramLayoutAction(diagram: Diagram, response): Action {
        let itemsOld = diagram.items.map(i => i.getState({ position: true }));
        let itemsNew = response.items.map((i) => {
            return { id: i.id, position: new Point(i.x, i.y), size: new Size(i.width, i.height) };
        });
        return this._actionFactory.addDiagramLayoutAction(response.actionId, diagram, itemsOld, itemsNew);
    }

    addDiagramSetTitleAction(diagram: Diagram, response): Action {
        return this._actionFactory.addDiagramSetTitleAction(response.actionId, diagram, diagram.title, response.diagramTitle);
    }

    addRelationAddAction(diagram: Diagram, response): Action {
        let relations: Relation[] = response.relations.map(r => {
            let from = diagram.getItemById(r.itemIdFrom);
            let to = diagram.getItemById(r.itemIdTo);
            if (from && to) {
                return Relation.makeWithItems(r.id, from, to);
            }
        });
        return this._actionFactory.addRelationAddAction(response.actionId, diagram, relations);
    }

    addRelationDeleteAction(diagram: Diagram, response): Action {
        let relations = response.relationsId.map(id => diagram.getRelationById(id));
        return this._actionFactory.addRelationDeleteAction(response.actionId, diagram, relations);
    }

    addRelationEditAction(diagram: Diagram, response): Action {
        let relationOld = diagram.getRelationById(response.relationOld.id);
        let from = diagram.getItemById(response.relationNew.itemIdFrom);
        let to = diagram.getItemById(response.relationNew.itemIdTo);
        let relationNew = Relation.makeWithItems(response.relationNew.id, from, to);
        return this._actionFactory.addRelationEditAction(response.actionId, diagram, relationOld, relationNew);
    }
}
