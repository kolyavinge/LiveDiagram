import { Action, ActionKind } from '../common/action';
import { Diagram, DiagramState } from '../model/diagram';

export class DiagramLoadAction extends Action {

    private _diagramState: DiagramState;

    constructor(
        diagram: Diagram) {
        super('0', diagram);
        this._info = { kind: ActionKind.load };
        this.isActive = true;
        this._diagramState = this.diagram.getState();
    }

    protected doInner(): void {
        this.diagram.setState(this._diagramState);
    }

    protected undoInner(): void { }
}
