import { Action, ActionKind } from "../common/action";
import { Diagram, DiagramState } from "../model/diagram";

export class DiagramLoadAction extends Action {

    private _diagramState: DiagramState;

    constructor(
        id: string = null,
        diagram: Diagram) {
        super(id, diagram);
        this._info = { kind: ActionKind.load };
        this.isActive = true;
        this._diagramState = this.diagram.getState();
    }

    protected doInner(): void {
        this.diagram.setState(this._diagramState);
    }

    protected undoInner(): void { }
}
