import { Point } from '../common/point';
import { Size } from '../common/size';
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
        return response.actions.map(action => this.makeAction(diagram, action)).filter(x => x != null);
    }

    private makeAction(diagram: Diagram, response): Action {
        if (response.type === 'DiagramItemAddAction') {
            return this.addDiagramItemAddAction(diagram, response);
        } else if (response.type === 'DiagramItemDeleteAction') {
            return this.addDiagramItemDeleteAction(diagram, response);
        } else if (response.type === 'DiagramItemEditAction') {
            return this.addDiagramItemEditAction(diagram, response);
        } else if (response.type === 'DiagramItemMoveAction') {
            return this.addDiagramItemMoveAction(diagram, response);
        } else if (response.type === 'DiagramItemResizeAction') {
            return this.addDiagramItemResizeAction(diagram, response);
        } else if (response.type === 'DiagramItemSetTitleAction') {
            return this.addDiagramItemSetTitleAction(diagram, response);
        } else if (response.type === 'DiagramLayoutAction') {
            return this.addDiagramLayoutAction(diagram, response);
        } else if (response.type === 'DiagramSetTitleAction') {
            return this.addDiagramSetTitleAction(diagram, response);
        } else if (response.type === 'RelationAddAction') {
            return this.addRelationAddAction(diagram, response);
        } else if (response.type === 'RelationDeleteAction') {
            return this.addRelationDeleteAction(diagram, response);
        } else if (response.type === 'RelationEditAction') {
            return this.addRelationEditAction(diagram, response);
        }

        return null;
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
        let movedItem = diagram.getItemById(response.itemId);
        let positionOld = movedItem.position;
        let positionNew = new Point(response.itemX, response.itemY);
        return this._actionFactory.addDiagramItemMoveAction(response.actionId, diagram, movedItem, positionOld, positionNew);
    }

    addDiagramItemResizeAction(diagram: Diagram, response): Action {
        let item = diagram.getItemById(response.itemId);
        let positionOld = item.position;
        let sizeOld = item.size;
        let positionNew = new Point(response.itemX, response.itemY);
        let sizeNew = new Size(response.itemWidth, response.itemHeight);
        return this._actionFactory.addDiagramItemResizeAction(response.actionId, diagram, item, positionOld, sizeOld, positionNew, sizeNew);
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
