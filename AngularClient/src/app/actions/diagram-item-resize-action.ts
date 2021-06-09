import { Action, ActionInfo, ActionKind } from "../contracts/action";
import { Point } from "../model/point";
import { Size } from "../model/size";
import { Diagram } from "../model/diagram";
import { DiagramItem, DiagramItemState } from "../model/diagram-item";

export class DiagramItemResizeAction extends Action {

    private _positionOld: Point;
    private _sizeOld: Size;
    private _positionNew: Point;
    private _sizeNew: Size;

    constructor(
        id: string = null,
        diagram: Diagram,
        private _item: DiagramItem,
        positionOld: Point,
        sizeOld: Size,
        positionNew: Point,
        sizeNew: Size) {
        super(id, diagram);
        this._positionOld = positionOld.copy();
        this._sizeOld = sizeOld.copy();
        this._positionNew = positionNew.copy();
        this._sizeNew = sizeNew.copy();
    }

    protected doInner(): void {
        var updated: DiagramItemState = {
            item: this._item,
            position: this._positionNew,
            size: this._sizeNew
        };
        this.diagram.updateItems([updated]);
    }

    protected undoInner(): void {
        var updated: DiagramItemState = {
            item: this._item,
            position: this._positionOld,
            size: this._sizeOld
        };
        this.diagram.updateItems([updated]);
    }

    protected getInfo(): ActionInfo {
        return {
            kind: ActionKind.resize,
            title: this._item.title
        }
    }
}
