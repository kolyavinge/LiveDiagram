import { Action, ActionKind } from '../common/action';
import { Diagram } from '../model/diagram';
import { Relation } from '../model/relation';

export class RelationEditAction extends Action {

    constructor(
        id: string = null,
        diagram: Diagram,
        private _relationOld: Relation,
        private _relationNew: Relation) {
        super(id, diagram);
        this._info = {
            kind: ActionKind.edit,
            title: this._relationNew.from.title + '-' + this._relationNew.to.title
        };
    }

    protected doInner(): void {
        if (this._relationOld) {
            this.diagram.deleteRelations([this._relationOld]);
        }
        if (this._relationNew) {
            this.diagram.addRelations([this._relationNew]);
            this._relationNew.calculateSegments();
        }
    }

    protected undoInner(): void {
        if (this._relationNew) {
            this.diagram.deleteRelations([this._relationNew]);
        }
        if (this._relationOld) {
            this.diagram.addRelations([this._relationOld]);
            this._relationOld.calculateSegments();
        }
    }
}
