import { Action, ActionKind } from '../common/action';
import { DiagramItemPosition } from '../contracts/diagram-item-position';
import { Diagram } from '../model/diagram';

export class DiagramItemMoveAction extends Action {

    constructor(
        id: string = null,
        diagram: Diagram,
        private _itemPositions: DiagramItemPosition[]) {
        super(id, diagram);
        this._info = {
            kind: ActionKind.move,
            title: this._itemPositions.length === 1 ? this._itemPositions[0].item.title : '(' + this._itemPositions.length + ')'
        };
    }

    protected doInner(): void {
        this._itemPositions.forEach(x => {
            this.diagram.moveItemTo(x.item, x.positionNew.x, x.positionNew.y);
        });
    }

    protected undoInner(): void {
        this._itemPositions.forEach(x => {
            this.diagram.moveItemTo(x.item, x.positionOld.x, x.positionOld.y);
        });
    }
}
