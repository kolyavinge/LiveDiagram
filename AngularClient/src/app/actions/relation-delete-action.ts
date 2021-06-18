import { Action, ActionKind } from '../common/action';
import { Diagram } from '../model/diagram';
import { Relation } from '../model/relation';

export class RelationDeleteAction extends Action {

    constructor(
        id: string = null,
        diagram: Diagram,
        private _relations: Relation[]) {
        super(id, diagram);
        this._info = {
            kind: ActionKind.delete,
            title: this._relations.length === 1 ? this._relations[0].from.title + '-' + this._relations[0].to.title : '(' + this._relations.length + ')'
        };
    }

    protected doInner(): void {
        this.diagram.deleteRelations(this._relations);
    }

    protected undoInner(): void {
        this.diagram.addRelations(this._relations);
        this._relations.forEach(r => r.calculateSegments());
    }
}
