import { DiagramItem } from 'src/app/model/diagram-item';
import { Point } from 'src/app/common/point';
import { Size } from 'src/app/common/size';
import { Geometry } from 'src/app/common/geometry';

export class SelectionRectangleModel {

    private _startPoint: Point;
    private _endPoint: Point;

    isActive: boolean = false;
    position: Point = new Point(0, 0);
    size: Size = new Size(0, 0);

    setStartPoint(value: Point): void {
        this.isActive = true;
        this._startPoint = value;
    }

    setEndPoint(value: Point): void {
        this._endPoint = value;
        this.calculateRectangle();
    }

    clear(): void {
        this.isActive = false;
        this.position = new Point(0, 0);
        this.size = new Size(0, 0);
    }

    getSelectedItems(items: DiagramItem[]): DiagramItem[] {
        return items.filter(i => this.isSelected(i));
    }

    private isSelected(item: DiagramItem): boolean {
        let itemX = item.position.x;
        let itemY = item.position.y;
        let itemWidth = item.size.width;
        let itemHeight = item.size.height;
        let rectX = this.position.x;
        let rectY = this.position.y;
        let rectWidth = this.size.width;
        let rectHeight = this.size.height;

        return this.pointInRectangle(itemX, itemY) ||
            this.pointInRectangle(itemX + itemWidth, itemY) ||
            this.pointInRectangle(itemX, itemY + itemHeight) ||
            this.pointInRectangle(itemX + itemWidth, itemY + itemHeight) ||
            this.lineCrossed(itemX, itemY, itemWidth, rectX, rectY, rectHeight) ||
            this.lineCrossed(itemX, itemY + itemHeight, itemWidth, rectX, rectY, rectHeight) ||
            this.lineCrossed(rectX, rectY, rectWidth, itemX, itemY, itemHeight) ||
            this.lineCrossed(rectX, rectY, rectWidth, itemX + itemWidth, itemY, itemHeight);
    }

    private pointInRectangle(x, y): boolean {
        return Geometry.pointInRectangle(x, y, this.position.x, this.position.y, this.size.width, this.size.height);
    }

    private lineCrossed(horizontX, horizontY, width, verticalX, verticalY, height): boolean {
        return Geometry.lineCrossed(horizontX, horizontY, width, verticalX, verticalY, height);
    }

    private calculateRectangle(): void {
        let minX = Math.min(this._startPoint.x, this._endPoint.x);
        let minY = Math.min(this._startPoint.y, this._endPoint.y);
        let width = Math.abs(this._startPoint.x - this._endPoint.x);
        let height = Math.abs(this._startPoint.y - this._endPoint.y);
        this.position = new Point(minX, minY);
        this.size = new Size(width, height);
    }
}
