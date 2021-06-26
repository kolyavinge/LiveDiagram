import { Action, ActionKind } from '../common/action';
import { DiagramItemResizePosition } from '../contracts/diagram-item-resize-position';
import { Diagram } from '../model/diagram';
import { DiagramItemState } from '../model/diagram-item';

export class DiagramItemResizeAction extends Action {

    constructor(
        id: string = null,
        diagram: Diagram,
        private _items: DiagramItemResizePosition[]) {
        super(id, diagram);
        this._info = {
            kind: ActionKind.resize,
            title: this._items.length === 1 ? this._items[0].item.title : '(' + this._items.length + ')'
        };
    }

    protected doInner(): void {
        let states: DiagramItemState[] = this._items.map(i => ({
            item: i.item,
            position: i.positionNew,
            size: i.sizeNew
        }));
        this.diagram.updateItems(states);
    }

    protected undoInner(): void {
        let states: DiagramItemState[] = this._items.map(i => ({
            item: i.item,
            position: i.positionOld,
            size: i.sizeOld
        }));
        this.diagram.updateItems(states);
    }
}
