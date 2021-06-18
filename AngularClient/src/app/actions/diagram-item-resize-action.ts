import { Action, ActionKind } from '../common/action';
import { Point } from '../common/point';
import { Size } from '../common/size';
import { Diagram } from '../model/diagram';
import { DiagramItem, DiagramItemState } from '../model/diagram-item';

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
        this._info = { kind: ActionKind.resize, title: this._item.title };
        this._positionOld = positionOld;
        this._sizeOld = sizeOld;
        this._positionNew = positionNew;
        this._sizeNew = sizeNew;
    }

    protected doInner(): void {
        let updated: DiagramItemState = {
            item: this._item,
            position: this._positionNew,
            size: this._sizeNew
        };
        this.diagram.updateItems([updated]);
    }

    protected undoInner(): void {
        let updated: DiagramItemState = {
            item: this._item,
            position: this._positionOld,
            size: this._sizeOld
        };
        this.diagram.updateItems([updated]);
    }
}
