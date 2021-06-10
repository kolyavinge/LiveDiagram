import { Action, ActionInfo, ActionKind } from "../contracts/action";
import { Diagram } from "../model/diagram";
import { DiagramItem } from "../model/diagram-item";
import { Method } from "../model/method";
import { Relation } from "../model/relation";

export class DiagramItemEditAction extends Action {

    constructor(
        id: string = null,
        diagram: Diagram,
        private _item: DiagramItem,
        private _titleOld: string,
        private _titleNew: string,
        private _parentRelationOld: Relation,
        private _parentRelationNew: Relation,
        private _methodsOld: Method[],
        private _methodsNew: Method[]) {
        super(id, diagram);
    }

    protected doInner(): void {
        this._item.title = this._titleNew;
        this._item.methods = this._methodsNew;
        if (this._parentRelationOld) {
            this.diagram.deleteRelations([this._parentRelationOld]);
        }
        if (this._parentRelationNew) {
            this.diagram.addRelations([this._parentRelationNew]);
            this._parentRelationNew.calculateSegments();
        }
    }

    protected undoInner(): void {
        this._item.title = this._titleOld;
        this._item.methods = this._methodsOld;
        if (this._parentRelationNew) {
            this.diagram.deleteRelations([this._parentRelationNew]);
        }
        if (this._parentRelationOld) {
            this.diagram.addRelations([this._parentRelationOld]);
            this._parentRelationOld.calculateSegments();
        }
    }

    get info(): ActionInfo {
        return {
            kind: ActionKind.edit,
            title: this._item.title
        }
    }
}
