import { Action, ActionInfo, ActionKind } from "../contracts/action";
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

    protected doInner(): void {
        this._itemCopy = this._item.copy();
        this.diagram.addItems([this._itemCopy]);
        if (this._parentRelation) {
            this._parentRelation.setDiagramItems(this._parentRelation.from, this._itemCopy);
            this.diagram.addRelations([this._parentRelation]);
        }
    }

    protected undoInner(): void {
        this.diagram.deleteItems([this._itemCopy]);
        if (this._parentRelation) this.diagram.deleteRelations([this._parentRelation]);
    }

    protected getInfo(): ActionInfo {
        return {
            kind: ActionKind.add,
            title: this._item.title
        }
    }
}
