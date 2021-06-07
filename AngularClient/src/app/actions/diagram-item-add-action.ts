import { Action, ActionInfo } from "../contracts/action";
import { Diagram } from "../model/diagram";
import { DiagramItem } from "../model/diagram-item";
import { Relation } from "../model/relation";

export class DiagramItemAddAction extends Action {

    private _itemCopy: DiagramItem;

    constructor(
        id: string = null,
        diagram: Diagram,
        private _item: DiagramItem,
        private _parentRelation: Relation) {
        super(id, diagram);
    }

    doInner(): void {
        this._itemCopy = this._item.copy();
        this.diagram.addItems([this._itemCopy]);
        if (this._parentRelation) {
            this._parentRelation.setDiagramItems(this._parentRelation.from, this._itemCopy);
            this.diagram.addRelations([this._parentRelation]);
        }
    }

    undoInner(): void {
        this.diagram.deleteItems([this._itemCopy]);
        if (this._parentRelation) this.diagram.deleteRelations([this._parentRelation]);
    }

    getInfo(): ActionInfo {
        return {
            kind: "добав",
            title: this._item.title
        }
    }
}
