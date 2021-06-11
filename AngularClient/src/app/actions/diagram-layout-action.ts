import { Action, ActionInfo, ActionKind } from "../common/action";
import { Diagram } from "../model/diagram";
import { DiagramItemState } from "../model/diagram-item";

export class DiagramLayoutAction extends Action {

    constructor(
        id: string = null,
        diagram: Diagram,
        private _itemsOld: DiagramItemState[],
        private _itemsNew: DiagramItemState[]) {
        super(id, diagram);
    }

    protected doInner(): void {
        this.diagram.updateItems(this._itemsNew);
    }

    protected undoInner(): void {
        this.diagram.updateItems(this._itemsOld);
    }

    get info(): ActionInfo {
        return {
            kind: ActionKind.layout,
            title: null
        }
    }
}
