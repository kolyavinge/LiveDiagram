import { Component, OnInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { Position } from 'src/app/model/position';
import { DiagramItem } from 'src/app/model/diagram-item';
import { Diagram } from 'src/app/model/diagram';
import { DiagramService } from 'src/app/services/diagram.service';
import { DiagramEventsService } from 'src/app/services/diagram-events.service';
import { Relation } from 'src/app/model/relation';

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
    private _pointedRelation: Relation;

    constructor(
        private _diagramEventsService: DiagramEventsService,
        private _diagramService: DiagramService,
    ) {
        var self = this;
        self._diagram = self._diagramService.diagram;
        self._diagramEventsService.diagramLoadedEvent.addHandler((diagram: Diagram) => {
            self._diagram = diagram;
        })
    }

    ngOnInit(): void { }

    get diagram(): Diagram { return this._diagram; }

    onMouseDown(event): void {
        this._pointedItem = this._diagram.getPointedItem();
        this._resizedItem = this._diagram.getResizedItem();
        this._pointedRelation = this._diagram.getPointedRelation();
        this._diagram.clearItemSelectionBut(this._pointedItem ?? this._resizedItem);
        this._diagram.clearRelationSelectionBut(this._pointedRelation);
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
                this._diagramEventsService.diagramItemMoveEvent.raise(this._pointedItem);
            }
            this._pointedItem.isPointed = false;
            this._pointedItem = null;
        }
        if (this._resizedItem) {
            if (this._resizedItem.hasResized) {
                this._diagramEventsService.diagramItemResizeEvent.raise(this._resizedItem);
            }
            this._resizedItem.clearResize();
            this._resizedItem = null;
        }
        if (this._pointedRelation) {
            this._pointedRelation.isPointed = false;
            this._pointedRelation = null;
        }
    }

    onResize(event: ResizedEvent): void {
        this._diagram.setSize(event.newWidth, event.newHeight);
    }
}
