import { Action, ActionInfo, ActionKind } from "../contracts/action";
import { Diagram } from "../model/diagram";
import { DiagramItem } from "../model/diagram-item";
import { Relation } from "../model/relation";

export class DiagramItemDeleteAction extends Action {

    constructor(
        id: string = null,
        diagram: Diagram,
        private _items: DiagramItem[],
        private _relations: Relation[]) {
        super(id, diagram);
    }

    protected doInner(): void {
        this.diagram.deleteItems(this._items);
        this.diagram.deleteRelations(this._relations);
    }

    protected undoInner(): void {
        this.diagram.addItems(this._items);
        this.diagram.addRelations(this._relations);
        this._relations.forEach(r => r.calculateSegments());
    }

    protected getInfo(): ActionInfo {
        return {
            kind: ActionKind.delete,
            title: this._items.length == 1 ? this._items[0].title : "(" + this._items.length + ")"
        }
    }
}
