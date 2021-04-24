import { Input } from '@angular/core';
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
    selectedItem: DiagramItem;
    mouseLastPosition: Position;

    constructor() {
        var self = this;
        self.diagram = new Diagram();
    }

    ngOnInit(): void {
    }

    onMouseDown(event): void {
        var self = this;
        self.selectedItem = self.diagram.getResizedItem();
        if (self.selectedItem) {
            self.mouseLastPosition = { x: event.x, y: event.y };
        } else {
            self.selectedItem = self.diagram.getPointedItem();
            if (self.selectedItem) {
                self.mouseLastPosition = { x: event.x, y: event.y };
            }
        }
    }

    onMouseMove(event): void {
        var self = this;
        if (self.selectedItem == null) return;
        var mouseCurrentPosition = { x: event.x, y: event.y };
        var deltaX = mouseCurrentPosition.x - self.mouseLastPosition.x;
        var deltaY = mouseCurrentPosition.y - self.mouseLastPosition.y;
        if (self.selectedItem.resizeDirectionValue > 0) {
            self.diagram.resizeItemBy(self.selectedItem, deltaX, deltaY);
        } else if (self.selectedItem) {
            self.diagram.moveItemBy(self.selectedItem, deltaX, deltaY);
        }
        self.mouseLastPosition = mouseCurrentPosition;
    }

    onMouseUp(event): void {
        var self = this;
        if (self.selectedItem) {
            self.diagram.clearResize(self.selectedItem);
        }
        self.selectedItem = null;
    }

    onResize(event: ResizedEvent): void {
        var self = this;
        self.diagram.size.width = event.newWidth;
        self.diagram.size.height = event.newHeight;
    }
}
