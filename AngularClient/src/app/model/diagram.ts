import { Position } from "./position";
import { Size } from "./size";
import { DiagramItem } from "./diagram-item";
import { ResizeDirection } from "./resize-direction";

export class Diagram {

    resize: ResizeDirection = new ResizeDirection();
    size: Size = new Size();
    items: DiagramItem[] = [];

    constructor() {
        this.items.push(new DiagramItem());
    }

    getPointedItem(): DiagramItem {
        return this.items.find(item => item.isPointed);
    }

    clearSelectionBut(item: DiagramItem): void {
        this.items.filter(i => i.isEquals(item) == false).forEach(i => i.isSelected = false);
    }

    moveItemBy(item: DiagramItem, deltaX: number, deltaY: number): void {
        item.position.x += deltaX;
        item.position.y += deltaY;
        this.correctItemPosition(item);
    }

    moveItemTo(item: DiagramItem, x: number, y: number): void {
        item.position.x = x;
        item.position.y = y;
        this.correctItemPosition(item);
    }

    correctItemPosition(item: DiagramItem): void {
        if (item.position.x < 0) item.position.x = 0;
        if (item.position.y < 0) item.position.y = 0;
        if (item.position.x + item.size.width > this.size.width) item.position.x = this.size.width - item.size.width;
        if (item.position.y + item.size.height > this.size.height) item.position.y = this.size.height - item.size.height;
    }

    resizeItemBy(item: DiagramItem, deltaWidth: number, deltaHeight: number): void {
        if (item.resizeDirectionValue == this.resize.upLeft) {
            // deltaWidth и deltaHeight меньше нуля
            item.position.x += deltaWidth;
            item.position.y += deltaHeight;
            item.size.width -= deltaWidth;
            item.size.height -= deltaHeight;
        } else if (item.resizeDirectionValue == this.resize.upMiddle) {
            // deltaHeight меньше нуля
            item.position.y += deltaHeight;
            item.size.height -= deltaHeight;
        } else if (item.resizeDirectionValue == this.resize.upRight) {
            // deltaHeight меньше нуля
            item.position.y += deltaHeight;
            item.size.width += deltaWidth;
            item.size.height -= deltaHeight;
        } else if (item.resizeDirectionValue == this.resize.middleLeft) {
            // deltaWidth меньше нуля
            item.position.x += deltaWidth;
            item.size.width -= deltaWidth;
        } else if (item.resizeDirectionValue == this.resize.middleRight) {
            item.size.width += deltaWidth;
        } else if (item.resizeDirectionValue == this.resize.downLeft) {
            // deltaWidth меньше нуля
            item.position.x += deltaWidth;
            item.size.width -= deltaWidth;
            item.size.height += deltaHeight;
        } else if (item.resizeDirectionValue == this.resize.downMiddle) {
            item.size.height += deltaHeight;
        } else if (item.resizeDirectionValue == this.resize.downRight) {
            item.size.width += deltaWidth;
            item.size.height += deltaHeight;
        }
        this.correctItemSize(item);
    }

    correctItemSize(item: DiagramItem): void {
        if (item.size.width <= item.minSize.width) item.size.width = item.minSize.width;
        if (item.size.height <= item.minSize.height) item.size.height = item.minSize.height;
    }
}
