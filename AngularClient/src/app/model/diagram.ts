import { Point } from '../common/point';
import { Size } from '../common/size';
import { Identifiable } from 'src/app/common/identifiable';
import { DiagramItem, DiagramItemState } from './diagram-item';
import { Relation, RelationState } from './relation';
import { ResizeLogic } from './resize-logic';

export class Diagram extends Identifiable {

    private _title: string = '';
    private _size: Size = new Size(0, 0);
    private _items: DiagramItem[] = [];
    private _relations: Relation[] = [];

    constructor(id: string = null) {
        super(id);
    }

    get title(): string { return this._title; }

    set title(value: string) { this._title = value; }

    get items(): DiagramItem[] { return this._items; }

    get relations(): Relation[] { return this._relations; }

    get size(): Size { return this._size; }

    set size(value: Size) { this._size = value; }

    getItemById(id: string): DiagramItem {
        return this._items.find(item => item.id === id);
    }

    getPointedItem(): DiagramItem {
        return this._items.find(item => item.isPointed);
    }

    getResizedItem(): DiagramItem {
        return this._items.find(item => item.resizeDirectionValue > 0);
    }

    getSelectedItems(): DiagramItem[] {
        return this._items.filter(item => item.isSelected);
    }

    clearItemSelectionBut(item: DiagramItem): void {
        this._items.filter(i => i.isEquals(item) === false).forEach(i => i.isSelected = false);
    }

    moveItemBy(item: DiagramItem, deltaX: number, deltaY: number): void {
        item.position = new Point(item.position.x + deltaX, item.position.y + deltaY);
        this.correctItemPosition(item);
        this.calculateRelationsSegments(item);
    }

    moveItemTo(item: DiagramItem, x: number, y: number): void {
        item.position = new Point(x, y);
        this.correctItemPosition(item);
        this.calculateRelationsSegments(item);
    }

    resizeItemBy(item: DiagramItem, deltaWidth: number, deltaHeight: number): void {
        let logic = new ResizeLogic();
        let result = logic.resizeItemBy(item, deltaWidth, deltaHeight);
        item.position = new Point(result.newX, result.newY);
        item.size = new Size(result.newWidth, result.newHeight);
        this.correctItemSize(item);
        this.calculateRelationsSegments(item);
    }

    addItems(items: DiagramItem[]): void {
        items.forEach(i => this._items.push(i));
    }

    deleteItems(items: DiagramItem[]): void {
        let includeInDeleteItems = (item: DiagramItem) => items.find(i => i.isEquals(item)) != null;
        this._items = this._items.filter(i => includeInDeleteItems(i) === false);
    }

    updateItems(updatedItems: DiagramItemState[]): void {
        let self = this;
        updatedItems.forEach(ui => {
            let item = ui.item ?? self._items.find(i => i.id === ui.id);
            if (item) item.setState(ui);
        });
        self._items.forEach(item => self.calculateRelationsSegments(item));
    }

    getRelationById(relationId: string): Relation {
        return this._relations.find(r => r.id === relationId);
    }

    getPointedRelation(): Relation {
        return this._relations.find(x => x.isPointed);
    }

    getSelectedRelations(): Relation[] {
        return this._relations.filter(x => x.isSelected);
    }

    clearRelationSelectionBut(relation: Relation): void {
        this._relations.filter(r => r.isEquals(relation) === false).forEach(r => r.isSelected = false);
    }

    addRelations(relations: Relation[]): void {
        relations.forEach(r => this._relations.push(r));
    }

    deleteRelations(relations: Relation[]): void {
        let includeInDeleteRelations = (relation: Relation) => relations.find(r => r.isEquals(relation)) != null;
        this._relations = this._relations.filter(r => includeInDeleteRelations(r) === false);
    }

    getItemRelations(item: DiagramItem): Relation[] {
        return this._relations.filter(r => r.from.isEquals(item) || r.to.isEquals(item));
    }

    getRelationsFromItem(item: DiagramItem): Relation[] {
        return this._relations.filter(r => r.from.isEquals(item));
    }

    getRelationsToItem(item: DiagramItem): Relation[] {
        return this._relations.filter(r => r.to.isEquals(item));
    }

    getState(): DiagramState {
        return {
            title: this.title,
            items: this.items.slice(),
            itemStates: this.items.map(i => i.getState()),
            relations: this.relations.slice(),
            relationStates: this.relations.map(i => i.getState())
        };
    }

    setState(state: DiagramState): void {
        this._title = state.title;
        this._items = [];
        this.addItems(state.items);
        state.itemStates.forEach(itemState => {
            let item = itemState.item ?? this._items.find(i => i.id === itemState.id);
            if (item) item.setState(itemState);
        });
        this._relations = [];
        this.addRelations(state.relations);
        state.relationStates.forEach(relationState => {
            let relation = relationState.relation ?? this._relations.find(r => r.id === relationState.id);
            if (relation) relation.setState(relationState);
        });
        this._items.forEach(item => this.calculateRelationsSegments(item));
    }

    private calculateRelationsSegments(item: DiagramItem): void {
        let itemRelations = this.getItemRelations(item);
        itemRelations.forEach(r => r.calculateSegments());
    }

    private correctItemPosition(item: DiagramItem): void {
        let x = 0;
        let y = 0;
        if (item.position.x < 0) x = 0;
        if (item.position.y < 0) y = 0;
        if (item.position.x + item.size.width > this._size.width) x = this._size.width - item.size.width;
        if (item.position.y + item.size.height > this._size.height) y = this._size.height - item.size.height;
        if (x || y) {
            item.position = new Point(x ?? item.position.x, y ?? item.position.y);
        }
    }

    private correctItemSize(item: DiagramItem): void {
        let width = 0;
        let height = 0;
        if (item.size.width <= item.minSize.width) width = item.minSize.width;
        if (item.size.height <= item.minSize.height) height = item.minSize.height;
        if (width || height) {
            item.size = new Size(width ?? item.size.width, height ?? item.size.height);
        }
    }
}

export interface DiagramState {
    title: string;
    items: DiagramItem[];
    itemStates: DiagramItemState[];
    relations: Relation[];
    relationStates: RelationState[];
}
