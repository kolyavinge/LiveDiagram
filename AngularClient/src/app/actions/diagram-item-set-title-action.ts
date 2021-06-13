import { Action, ActionKind } from "../common/action";
import { Diagram } from "../model/diagram";
import { DiagramItem } from "../model/diagram-item";

export class DiagramItemSetTitleAction extends Action {

    constructor(
        id: string = null,
        diagram: Diagram,
        private _item: DiagramItem,
        private _titleOld: string,
        private _titleNew: string) {
        super(id, diagram);
        this._info = { kind: ActionKind.rename, title: this._titleNew };
    }

    protected doInner(): void {
        this._item.title = this._titleNew;
    }

    protected undoInner(): void {
        this._item.title = this._titleOld;
    }
}
