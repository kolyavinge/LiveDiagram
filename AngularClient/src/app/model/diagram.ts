import { Position } from "./position";
import { Size } from "./size";
import { DiagramItem } from "./diagram-item";

export class Diagram {

    size: Size = new Size();
    items: DiagramItem[] = [];

    constructor() {
        var self = this;
        self.items.push(new DiagramItem());
    }

    moveBy(item: DiagramItem, x: number, y: number): void {
        item.position.x += x;
        item.position.y += y;
        this.correctPosition(item);
    }

    moveTo(item: DiagramItem, x: number, y: number): void {
        item.position.x = x;
        item.position.y = y;
        this.correctPosition(item);
    }

    correctPosition(item: DiagramItem): void {
        if (item.position.x < 0) item.position.x = 0;
        if (item.position.y < 0) item.position.y = 0;
        if (item.position.x + item.size.width > this.size.width) item.position.x = this.size.width - item.size.width;
        if (item.position.y + item.size.height > this.size.height) item.position.y = this.size.height - item.size.height;
    }

    getPointedItem(): DiagramItem {
        return this.items.find(item => item.isPointed);
    }
}
