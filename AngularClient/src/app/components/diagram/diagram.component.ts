import { Component, OnInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { ApiService } from 'src/app/services/api.service';
import { DiagramUpdaterService } from 'src/app/services/diagram-updater.service';
import { Position } from 'src/app/model/position';
import { DiagramItem } from 'src/app/model/diagram-item';
import { Diagram } from 'src/app/model/diagram';
import { DiagramService } from 'src/app/services/diagram.service';

@Component({
    selector: 'app-diagram',
    templateUrl: './diagram.component.html',
    styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnInit {

    diagram: Diagram;
    pointedItem: DiagramItem;
    resizedItem: DiagramItem;
    mouseLastPosition: Position;

    constructor(
        private apiService: ApiService,
        private diagramService: DiagramService,
        private diagramServiceUpdater: DiagramUpdaterService,
    ) {
        this.diagram = this.diagramService.getCurrentDiagram();
        this.diagramServiceUpdater.connectToDiagram(this.diagram);
    }

    ngOnInit(): void { }

    onMouseDown(event): void {
        this.pointedItem = this.diagram.getPointedItem();
        this.resizedItem = this.diagram.getResizedItem();
        this.diagram.clearSelectionBut(this.pointedItem ?? this.resizedItem);
        if (this.pointedItem || this.resizedItem) {
            this.mouseLastPosition = { x: event.x, y: event.y };
        }
    }

    onMouseMove(event): void {
        if (this.pointedItem == null && this.resizedItem == null) return;
        var mouseCurrentPosition = { x: event.x, y: event.y };
        var deltaX = mouseCurrentPosition.x - this.mouseLastPosition.x;
        var deltaY = mouseCurrentPosition.y - this.mouseLastPosition.y;
        if (this.resizedItem) {
            this.diagram.resizeItemBy(this.resizedItem, deltaX, deltaY);
        } else if (this.pointedItem) {
            this.diagram.moveItemBy(this.pointedItem, deltaX, deltaY);
        }
        this.mouseLastPosition = mouseCurrentPosition;
    }

    onMouseUp(event): void {
        if (this.pointedItem) {
            if (this.pointedItem.hasMoved) {
                this.apiService.diagramItemMove(this.pointedItem);
            }
            this.pointedItem.clearPointed();
            this.pointedItem = null;
        }
        if (this.resizedItem) {
            if (this.resizedItem.hasResized) {
                this.apiService.diagramItemResize(this.resizedItem);
            }
            this.resizedItem.clearResize();
            this.resizedItem = null;
        }
    }

    onResize(event: ResizedEvent): void {
        this.diagram.size.width = event.newWidth;
        this.diagram.size.height = event.newHeight;
    }
}
