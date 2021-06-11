import { Action, ActionInfo, ActionKind } from "../common/action";
import { Diagram } from "../model/diagram";
import { Relation } from "../model/relation";

export class RelationAddAction extends Action {

    constructor(
        id: string = null,
        diagram: Diagram,
        private _relations: Relation[]) {
        super(id, diagram);
    }

    protected doInner(): void {
        this.diagram.addRelations(this._relations);
        this._relations.forEach(r => r.calculateSegments());
    }

    protected undoInner(): void {
        this.diagram.deleteRelations(this._relations);
    }

    get info(): ActionInfo {
        return {
            kind: ActionKind.add,
            title: this._relations.length == 1 ? this._relations[0].from.title + "-" + this._relations[0].to.title : "(" + this._relations.length + ")"
        }
    }
}
