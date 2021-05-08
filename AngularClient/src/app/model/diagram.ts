import { Size } from "./size";
import { DiagramItem } from "./diagram-item";
import { Relation } from "./relation";
import { ResizeDirection } from "./resize-direction";
import Utils from 'src/app/infrastructure/utils';

export class Diagram {

    private resize: ResizeDirection = new ResizeDirection();

    private _id: string;
    private _size: Size = new Size();
    private _items: DiagramItem[] = [];
    private _relations: Relation[] = [];

    constructor(id: string = null) {
        this._id = id ?? Utils.generateId();
    }

    get id(): string { return this._id; }

    get items(): DiagramItem[] { return this._items; }

    get relations(): Relation[] { return this._relations; }

    setSize(width: number, height: number): void {
        this._size.width = width;
        this._size.height = height;
    }

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

    getSelectedItem(): DiagramItem {
        return this._items.find(item => item.isSelected);
    }

    clearSelectionBut(item: DiagramItem): void {
        this._items.filter(i => i.isEquals(item) == false).forEach(i => i.isSelected = false);
    }

    setItemPosition(item: DiagramItem, x: number, y: number): void {
        item.setPosition(x, y);
    }

    setItemSize(item: DiagramItem, width: number, height: number): void {
        item.setSize(width, height);
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

    addItem(item: DiagramItem): void {
        this._items.push(item);
    }

    deleteItems(items: DiagramItem[]): void {
        var includeInDeleteItems = (item: DiagramItem) => items.find(i => i.isEquals(item)) != null;
        this._items = this._items.filter(i => includeInDeleteItems(i) == false);
    }

    getRelationsById(relationsId: string[]): Relation[] {
        return this._relations.filter(r => relationsId.includes(r.id));
    }

    addRelation(relation: Relation): void {
        this._relations.push(relation);
    }

    deleteRelations(relations: Relation[]): void {
        var includeInDeleteRelations = (relation: Relation) => relations.find(r => r.isEquals(relation)) != null;
        this._relations = this._relations.filter(r => includeInDeleteRelations(r) == false);
    }

    getItemRelations(item: DiagramItem): Relation[] {
        return this._relations.filter(r => r.from.isEquals(item) || r.to.isEquals(item));
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

    resizeItemBy(item: DiagramItem, deltaWidth: number, deltaHeight: number): void {
        var newX = item.position.x;
        var newY = item.position.y;
        var newWidth = item.size.width;
        var newHeight = item.size.height;
        if (item.resizeDirectionValue == this.resize.upLeft) {
            // deltaWidth и deltaHeight меньше нуля
            newX += deltaWidth;
            newY += deltaHeight;
            newWidth -= deltaWidth;
            newHeight -= deltaHeight;
        } else if (item.resizeDirectionValue == this.resize.upMiddle) {
            // deltaHeight меньше нуля
            newY += deltaHeight;
            newHeight -= deltaHeight;
        } else if (item.resizeDirectionValue == this.resize.upRight) {
            // deltaHeight меньше нуля
            newY += deltaHeight;
            newWidth += deltaWidth;
            newHeight -= deltaHeight;
        } else if (item.resizeDirectionValue == this.resize.middleLeft) {
            // deltaWidth меньше нуля
            newX += deltaWidth;
            newWidth -= deltaWidth;
        } else if (item.resizeDirectionValue == this.resize.middleRight) {
            newWidth += deltaWidth;
        } else if (item.resizeDirectionValue == this.resize.downLeft) {
            // deltaWidth меньше нуля
            newX += deltaWidth;
            newWidth -= deltaWidth;
            newHeight += deltaHeight;
        } else if (item.resizeDirectionValue == this.resize.downMiddle) {
            newHeight += deltaHeight;
        } else if (item.resizeDirectionValue == this.resize.downRight) {
            newWidth += deltaWidth;
            newHeight += deltaHeight;
        }
        item.setPosition(newX, newY);
        item.setSize(newWidth, newHeight);
        this.correctItemSize(item);
        this.calculateRelationsSegments(item);
    }

    private correctItemSize(item: DiagramItem): void {
        if (item.size.width <= item.minSize.width) item.size.width = item.minSize.width;
        if (item.size.height <= item.minSize.height) item.size.height = item.minSize.height;
    }
}
