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

    private _diagram: Diagram;
    private _pointedItem: DiagramItem;
    private _resizedItem: DiagramItem;
    private _mouseLastPosition: Position;

    constructor(
        private _apiService: ApiService,
        private _diagramService: DiagramService,
        private _diagramServiceUpdater: DiagramUpdaterService,
    ) {
        this._diagram = this._diagramService.getCurrentDiagram();
        this._diagramServiceUpdater.connectToDiagram(this._diagram);
    }

    ngOnInit(): void { }

    get diagram(): Diagram { return this._diagram; }

    onMouseDown(event): void {
        this._pointedItem = this._diagram.getPointedItem();
        this._resizedItem = this._diagram.getResizedItem();
        this._diagram.clearSelectionBut(this._pointedItem ?? this._resizedItem);
        if (this._pointedItem || this._resizedItem) {
            this._mouseLastPosition = new Position(event.x, event.y);
        }
    }

    onMouseMove(event): void {
        if (this._pointedItem == null && this._resizedItem == null) return;
        var mouseCurrentPosition = new Position(event.x, event.y);
        var deltaX = mouseCurrentPosition.x - this._mouseLastPosition.x;
        var deltaY = mouseCurrentPosition.y - this._mouseLastPosition.y;
        if (this._resizedItem) {
            this._diagram.resizeItemBy(this._resizedItem, deltaX, deltaY);
        } else if (this._pointedItem) {
            this._diagram.moveItemBy(this._pointedItem, deltaX, deltaY);
        }
        this._mouseLastPosition = mouseCurrentPosition;
    }

    onMouseUp(event): void {
        if (this._pointedItem) {
            if (this._pointedItem.hasMoved) {
                this._apiService.diagramItemMove(this._pointedItem);
            }
            this._pointedItem.isPointed = false;
            this._pointedItem = null;
        }
        if (this._resizedItem) {
            if (this._resizedItem.hasResized) {
                this._apiService.diagramItemResize(this._resizedItem);
            }
            this._resizedItem.clearResize();
            this._resizedItem = null;
        }
    }

    onResize(event: ResizedEvent): void {
        this._diagram.setSize(event.newWidth, event.newHeight);
    }
}
