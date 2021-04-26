import { Component, OnInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { ApiService } from 'src/app/services/api.service';
import { ApiNotifierService } from 'src/app/services/api-notifier.service';
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
    resizedItem: DiagramItem;
    mouseLastPosition: Position;

    constructor(
        private apiService: ApiService,
        private apiNotifierService: ApiNotifierService
    ) {
        this.diagram = new Diagram();
        this.connectToDiagram();
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
                this.apiService.diagramItemMove(this.diagram, this.pointedItem);
            }
            this.pointedItem.clearPointed();
            this.pointedItem = null;
        }
        if (this.resizedItem) {
            if (this.resizedItem.hasResized) {
                this.apiService.diagramItemResize(this.diagram, this.resizedItem);
            }
            this.resizedItem.clearResize();
            this.resizedItem = null;
        }
    }

    onResize(event: ResizedEvent): void {
        this.diagram.size.width = event.newWidth;
        this.diagram.size.height = event.newHeight;
    }

    connectToDiagram(): void {
        var self = this;
        self.apiNotifierService.clearHandlers();

        self.apiNotifierService.onDiagramItemMove(function (response) {
            var movedItem = self.diagram.getItemById(response.itemId);
            if (movedItem) {
                self.diagram.moveItemTo(movedItem, response.x, response.y);
            }
        });

        self.apiNotifierService.onDiagramItemResize(function (response) {
            var resizedItem = self.diagram.getItemById(response.itemId);
            if (resizedItem) {
                self.diagram.setItemPosition(resizedItem, response.x, response.y);
                self.diagram.setItemSize(resizedItem, response.width, response.height);
            }
        });

        self.apiNotifierService.connectToDiagram(self.diagram.id);
    }
}
