import { Action, ActionInfo, ActionKind } from "../contracts/action";
import { Point } from "../model/point";
import { Diagram } from "../model/diagram";
import { DiagramItem } from "../model/diagram-item";

export class DiagramItemMoveAction extends Action {

    constructor(
        id: string = null,
        diagram: Diagram,
        private _item: DiagramItem,
        private _positionOld: Point,
        private _positionNew: Point) {
        super(id, diagram);
    }

    protected doInner(): void {
        this.diagram.moveItemTo(this._item, this._positionNew.x, this._positionNew.y);
    }

    protected undoInner(): void {
        this.diagram.moveItemTo(this._item, this._positionOld.x, this._positionOld.y);
    }

    protected getInfo(): ActionInfo {
        return {
            kind: ActionKind.move,
            title: this._item.title
        }
    }
}