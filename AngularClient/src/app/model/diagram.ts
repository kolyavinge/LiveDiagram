import { Size } from "./size";
import { Point } from "./point";
import { Identifiable } from 'src/app/model/identifiable';
import { DiagramItem, DiagramItemState } from "./diagram-item";
import { Relation } from "./relation";
import { ResizeLogic } from "./resize-logic";

export class Diagram extends Identifiable {

    private _title: string = "";
    private _size: Size = new Size();
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
        return this._items.find(item => item.id == id);
    }

    getItemsById(ids: string[]): DiagramItem[] {
        return this._items.filter(item => ids.includes(item.id));
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
        this._items.filter(i => i.isEquals(item) == false).forEach(i => i.isSelected = false);
    }

    moveItemBy(item: DiagramItem, deltaX: number, deltaY: number): void {
        item.setPosition(item.position.x + deltaX, item.position.y + deltaY);
        this.correctItemPosition(item);
        this.calculateRelationsSegments(item);
    }

    moveItemTo(item: DiagramItem, x: number, y: number): void {
        item.setPosition(x, y);
        this.correctItemPosition(item);
        this.calculateRelationsSegments(item);
    }

    resizeItemBy(item: DiagramItem, deltaWidth: number, deltaHeight: number): void {
        var logic = new ResizeLogic();
        var result = logic.resizeItemBy(item, deltaWidth, deltaHeight);
        item.setPosition(result.newX, result.newY);
        item.setSize(result.newWidth, result.newHeight);
        this.correctItemSize(item);
        this.calculateRelationsSegments(item);
    }

    addItems(items: DiagramItem[]): void {
        items.forEach(i => this._items.push(i));
    }

    deleteItems(items: DiagramItem[]): void {
        var includeInDeleteItems = (item: DiagramItem) => items.find(i => i.isEquals(item)) != null;
        this._items = this._items.filter(i => includeInDeleteItems(i) == false);
    }

    updateItems(updatedItems: DiagramItemState[]): void {
        var self = this;
        updatedItems.forEach(ui => {
            var item = ui.item ?? self._items.find(item => item.id == ui.id);
            if (item) {
                if (ui.position) item.setPosition(ui.position.x, ui.position.y);
                if (ui.size) item.setSize(ui.size.width, ui.size.height);
            }
        });
        self._items.forEach(item => {
            self.calculateRelationsSegments(item);
        });
    }

    getRelationsById(relationsId: string[]): Relation[] {
        return this._relations.filter(r => relationsId.includes(r.id));
    }

    getPointedRelation(): Relation {
        return this._relations.find(x => x.isPointed);
    }

    getSelectedRelations(): Relation[] {
        return this._relations.filter(x => x.isSelected);
    }

    clearRelationSelectionBut(relation: Relation): void {
        this._relations.filter(r => r.isEquals(relation) == false).forEach(r => r.isSelected = false);
    }

    addRelations(relations: Relation[]): void {
        relations.forEach(r => this._relations.push(r));
    }

    deleteRelations(relations: Relation[]): void {
        var includeInDeleteRelations = (relation: Relation) => relations.find(r => r.isEquals(relation)) != null;
        this._relations = this._relations.filter(r => includeInDeleteRelations(r) == false);
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

    getMatchedItems(point: Point): DiagramItem[] {
        return this._items.filter(i => i.isMatched(point));
    }

    private calculateRelationsSegments(item: DiagramItem): void {
        var itemRelations = this.getItemRelations(item);
        itemRelations.forEach(r => r.calculateSegments());
    }

    private correctItemPosition(item: DiagramItem): void {
        if (item.position.x < 0) item.position.x = 0;
        if (item.position.y < 0) item.position.y = 0;
        if (item.position.x + item.size.width > this._size.width) item.position.x = this._size.width - item.size.width;
        if (item.position.y + item.size.height > this._size.height) item.position.y = this._size.height - item.size.height;
    }

    private correctItemSize(item: DiagramItem): void {
        if (item.size.width <= item.minSize.width) item.size.width = item.minSize.width;
        if (item.size.height <= item.minSize.height) item.size.height = item.minSize.height;
    }
}
