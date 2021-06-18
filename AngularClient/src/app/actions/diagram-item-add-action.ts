import { Action, ActionKind } from '../common/action';
import { Diagram } from '../model/diagram';
import { DiagramItem, DiagramItemState } from '../model/diagram-item';
import { Relation } from '../model/relation';

export class DiagramItemAddAction extends Action {

    private _itemState: DiagramItemState;

    constructor(
        id: string = null,
        diagram: Diagram,
        private _item: DiagramItem,
        private _parentRelation: Relation) {
        super(id, diagram);
        this._info = { kind: ActionKind.add, title: this._item.title };
        this._itemState = this._item.getState();
    }

    protected doInner(): void {
        this.diagram.addItems([this._item]);
        if (this._parentRelation) {
            this.diagram.addRelations([this._parentRelation]);
        }
    }

    protected undoInner(): void {
        this.diagram.deleteItems([this._item]);
        this._item.setState(this._itemState);
        if (this._parentRelation) this.diagram.deleteRelations([this._parentRelation]);
    }
}
