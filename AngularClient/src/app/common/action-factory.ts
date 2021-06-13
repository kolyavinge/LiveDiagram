import { Point } from '../model/point';
import { Size } from '../model/size';
import { DiagramItem, DiagramItemState } from '../model/diagram-item';
import { Method } from '../model/method';
import { Relation } from '../model/relation';
import { Diagram } from '../model/diagram';
import { DiagramLoadAction } from '../actions/diagram-load-action';
import { DiagramSetTitleAction } from '../actions/diagram-set-title-action';
import { DiagramLayoutAction } from '../actions/diagram-layout-action';
import { DiagramItemAddAction } from '../actions/diagram-item-add-action';
import { DiagramItemEditAction } from '../actions/diagram-item-edit-action';
import { DiagramItemDeleteAction } from '../actions/diagram-item-delete-action';
import { DiagramItemMoveAction } from '../actions/diagram-item-move-action';
import { DiagramItemResizeAction } from '../actions/diagram-item-resize-action';
import { DiagramItemSetTitleAction } from '../actions/diagram-item-set-title-action';
import { RelationAddAction } from '../actions/relation-add-action';
import { RelationEditAction } from '../actions/relation-edit-action';
import { RelationDeleteAction } from '../actions/relation-delete-action';

export class ActionFactory {

    makeDiagramLoadAction(diagram: Diagram): DiagramLoadAction {
        return new DiagramLoadAction(null, diagram);
    }

    makeDiagramSetTitleAction(diagram: Diagram, titleOld: string, titleNew: string): DiagramSetTitleAction {
        return new DiagramSetTitleAction(null, diagram, titleOld, titleNew);
    }

    addDiagramSetTitleAction(actionId: string, diagram: Diagram, titleOld: string, titleNew: string): DiagramSetTitleAction {
        return new DiagramSetTitleAction(actionId, diagram, titleOld, titleNew);
    }

    makeDiagramLayoutAction(diagram: Diagram, itemsOld: DiagramItemState[], itemsNew: DiagramItemState[]): DiagramLayoutAction {
        return new DiagramLayoutAction(null, diagram, itemsOld, itemsNew);
    }

    addDiagramLayoutAction(actionId: string, diagram: Diagram, itemsOld: DiagramItemState[], itemsNew: DiagramItemState[]): DiagramLayoutAction {
        return new DiagramLayoutAction(actionId, diagram, itemsOld, itemsNew);
    }

    makeDiagramItemAddAction(diagram: Diagram, item: DiagramItem, parentRelation: Relation): DiagramItemAddAction {
        return new DiagramItemAddAction(null, diagram, item, parentRelation);
    }

    addDiagramItemAddAction(actionId: string, diagram: Diagram, item: DiagramItem, parentRelation: Relation): DiagramItemAddAction {
        return new DiagramItemAddAction(actionId, diagram, item, parentRelation);
    }

    makeDiagramItemEditAction(
        diagram: Diagram,
        item: DiagramItem,
        titleOld: string,
        titleNew: string,
        parentRelationOld: Relation,
        parentRelationNew: Relation,
        methodsOld: Method[],
        methodsNew: Method[]): DiagramItemEditAction {
        return new DiagramItemEditAction(null, diagram, item, titleOld, titleNew, parentRelationOld, parentRelationNew, methodsOld, methodsNew);
    }

    addDiagramItemEditAction(
        actionId: string,
        diagram: Diagram,
        item: DiagramItem,
        titleOld: string,
        titleNew: string,
        parentRelationOld: Relation,
        parentRelationNew: Relation,
        methodsOld: Method[],
        methodsNew: Method[]): DiagramItemEditAction {
        return new DiagramItemEditAction(actionId, diagram, item, titleOld, titleNew, parentRelationOld, parentRelationNew, methodsOld, methodsNew);
    }

    makeDiagramItemDeleteAction(diagram: Diagram, items: DiagramItem[], relations: Relation[]): DiagramItemDeleteAction {
        return new DiagramItemDeleteAction(null, diagram, items, relations);
    }

    addDiagramItemDeleteAction(actionId: string, diagram: Diagram, items: DiagramItem[], relations: Relation[]): DiagramItemDeleteAction {
        return new DiagramItemDeleteAction(actionId, diagram, items, relations);
    }

    makeDiagramItemMoveAction(diagram: Diagram, item: DiagramItem, positionOld: Point, positionNew: Point): DiagramItemMoveAction {
        return new DiagramItemMoveAction(null, diagram, item, positionOld, positionNew);
    }

    addDiagramItemMoveAction(actionId: string, diagram: Diagram, item: DiagramItem, positionOld: Point, positionNew: Point): DiagramItemMoveAction {
        return new DiagramItemMoveAction(actionId, diagram, item, positionOld, positionNew);
    }

    makeDiagramItemResizeAction(diagram: Diagram, item: DiagramItem, positionOld: Point, sizeOld: Size, positionNew: Point, sizeNew: Size): DiagramItemResizeAction {
        return new DiagramItemResizeAction(null, diagram, item, positionOld, sizeOld, positionNew, sizeNew);
    }

    addDiagramItemResizeAction(actionId: string, diagram: Diagram, item: DiagramItem, positionOld: Point, sizeOld: Size, positionNew: Point, sizeNew: Size): DiagramItemResizeAction {
        return new DiagramItemResizeAction(actionId, diagram, item, positionOld, sizeOld, positionNew, sizeNew);
    }

    makeDiagramItemSetTitleAction(diagram: Diagram, item: DiagramItem, titleOld: string, titleNew: string): DiagramItemSetTitleAction {
        return new DiagramItemSetTitleAction(null, diagram, item, titleOld, titleNew);
    }

    addDiagramItemSetTitleAction(actionId: string, diagram: Diagram, item: DiagramItem, titleOld: string, titleNew: string): DiagramItemSetTitleAction {
        return new DiagramItemSetTitleAction(actionId, diagram, item, titleOld, titleNew);
    }

    makeRelationAddAction(diagram: Diagram, relations: Relation[]): RelationAddAction {
        return new RelationAddAction(null, diagram, relations);
    }

    addRelationAddAction(actionId: string, diagram: Diagram, relations: Relation[]): RelationAddAction {
        return new RelationAddAction(actionId, diagram, relations);
    }

    makeRelationDeleteAction(diagram: Diagram, relations: Relation[]): RelationDeleteAction {
        return new RelationDeleteAction(null, diagram, relations);
    }

    makeRelationEditAction(diagram: Diagram, relationOld: Relation, relationNew: Relation): RelationEditAction {
        return new RelationEditAction(null, diagram, relationOld, relationNew);
    }

    addRelationEditAction(actionId: string, diagram: Diagram, relationOld: Relation, relationNew: Relation): RelationEditAction {
        return new RelationEditAction(actionId, diagram, relationOld, relationNew);
    }

    addRelationDeleteAction(actionId: string, diagram: Diagram, relations: Relation[]): RelationDeleteAction {
        return new RelationDeleteAction(actionId, diagram, relations);
    }
}
