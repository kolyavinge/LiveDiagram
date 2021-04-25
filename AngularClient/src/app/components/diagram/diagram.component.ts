import { Component, OnInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { Position } from 'src/app/model/position';
import { DiagramItem } from 'src/app/model/diagram-item';
import { Diagram } from 'src/app/model/diagram';

@Component({
    selector: 'app-diagram',
    templateUrl: './diagram.component.html',
    styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnInit {

    diagram: Diagram;
    pointedItem: DiagramItem;
    mouseLastPosition: Position;

    constructor() {
        this.diagram = new Diagram();
    }

    ngOnInit(): void { }

    onMouseDown(event): void {
        this.pointedItem = this.diagram.getPointedItem();
        this.diagram.clearSelectionBut(this.pointedItem);
        if (this.pointedItem) {
            this.mouseLastPosition = { x: event.x, y: event.y };
        }
    }

    onMouseMove(event): void {
        if (this.pointedItem == null) return;
        var mouseCurrentPosition = { x: event.x, y: event.y };
        var deltaX = mouseCurrentPosition.x - this.mouseLastPosition.x;
        var deltaY = mouseCurrentPosition.y - this.mouseLastPosition.y;
        if (this.pointedItem.resizeDirectionValue > 0) {
            this.diagram.resizeItemBy(this.pointedItem, deltaX, deltaY);
        } else if (this.pointedItem) {
            this.diagram.moveItemBy(this.pointedItem, deltaX, deltaY);
        }
        this.mouseLastPosition = mouseCurrentPosition;
    }

    onMouseUp(event): void {
        if (this.pointedItem) {
            this.pointedItem.clearPointed();
            this.pointedItem.clearResize();
        }
        this.pointedItem = null;
    }

    onResize(event: ResizedEvent): void {
        this.diagram.size.width = event.newWidth;
        this.diagram.size.height = event.newHeight;
    }
}
