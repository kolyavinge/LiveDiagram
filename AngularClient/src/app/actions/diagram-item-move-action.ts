import { Action, ActionKind } from '../common/action';
import { Point } from '../common/geometry';
import { Diagram } from '../model/diagram';
import { DiagramItem } from '../model/diagram-item';

export class DiagramItemMoveAction extends Action {

    private _positionOld: Point;
    private _positionNew: Point;

    constructor(
        id: string = null,
        diagram: Diagram,
        private _item: DiagramItem,
        positionOld: Point,
        positionNew: Point) {
        super(id, diagram);
        this._info = { kind: ActionKind.move, title: this._item.title };
        this._positionOld = positionOld;
        this._positionNew = positionNew;
    }

    protected doInner(): void {
        this.diagram.moveItemTo(this._item, this._positionNew.x, this._positionNew.y);
    }

    protected undoInner(): void {
        this.diagram.moveItemTo(this._item, this._positionOld.x, this._positionOld.y);
    }
}
