import { Action, ActionInfo, ActionKind } from "../contracts/action";
import { Diagram, DiagramState } from "../model/diagram";

export class DiagramLoadAction extends Action {

    private _diagramState: DiagramState;

    constructor(
        id: string = null,
        diagram: Diagram) {
        super(id, diagram);
        this._diagramState = this.diagram.getState();
    }

    get isActive(): boolean { return true; }

    do(): void {
        this.doInner();
    }

    protected doInner(): void {
        this.diagram.setState(this._diagramState);
    }

    protected undoInner(): void { }

    get info(): ActionInfo {
        return {
            kind: ActionKind.load,
            title: this.diagram.title
        }
    }
}
