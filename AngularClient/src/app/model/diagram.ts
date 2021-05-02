import { Position } from "./position";
import { Size } from "./size";
import { DiagramItem } from "./diagram-item";
import { ResizeDirection } from "./resize-direction";

export class Diagram {

    private resize: ResizeDirection = new ResizeDirection();

    private _id: string = "12345";
    private _size: Size = new Size();
    private _items: DiagramItem[] = [];

    constructor() {
    }

    get id(): string { return this._id; }

    get items(): DiagramItem[] { return this._items; }

    setSize(width: number, height: number): void {
        this._size.width = width;
        this._size.height = height;
    }

    getItemById(id: string): DiagramItem {
        return this._items.find(item => item.id == id);
    }

    getPointedItem(): DiagramItem {
        return this._items.find(item => item.isPointed);
    }

    getResizedItem(): DiagramItem {
        return this._items.find(item => item.resizeDirectionValue > 0);
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
    }

    moveItemTo(item: DiagramItem, x: number, y: number): void {
        item.setPosition(x, y);
        this.correctItemPosition(item);
    }

    addItem(item: DiagramItem): void {
        this._items.push(item);
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
    }

    private correctItemSize(item: DiagramItem): void {
        if (item.size.width <= item.minSize.width) item.size.width = item.minSize.width;
        if (item.size.height <= item.minSize.height) item.size.height = item.minSize.height;
    }
}
