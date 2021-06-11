import { Action, ActionInfo, ActionKind } from "../common/action";
import { Diagram } from "../model/diagram";

export class DiagramSetTitleAction extends Action {

    constructor(
        id: string = null,
        diagram: Diagram,
        private _titleOld: string,
        private _titleNew: string) {
        super(id, diagram);
    }

    protected doInner(): void {
        this.diagram.title = this._titleNew;
    }

    protected undoInner(): void {
        this.diagram.title = this._titleOld;
    }

    get info(): ActionInfo {
        return {
            kind: ActionKind.rename,
            title: this._titleNew
        }
    }
}
