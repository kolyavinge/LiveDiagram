import { Action, ActionKind } from "../common/action";
import { Diagram } from "../model/diagram";

export class DiagramSetTitleAction extends Action {

    constructor(
        id: string = null,
        diagram: Diagram,
        private _titleOld: string,
        private _titleNew: string) {
        super(id, diagram);
        this._info = { kind: ActionKind.rename, title: this._titleNew };
    }

    protected doInner(): void {
        this.diagram.title = this._titleNew;
    }

    protected undoInner(): void {
        this.diagram.title = this._titleOld;
    }
}
