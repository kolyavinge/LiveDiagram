import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { Point } from 'src/app/model/point';
import { Size } from 'src/app/model/size';
import { DiagramItem, DiagramItemState } from 'src/app/model/diagram-item';
import { Relation } from 'src/app/model/relation';
import { Diagram } from 'src/app/model/diagram';
import { DiagramService } from 'src/app/services/diagram.service';
import { DiagramEventsService } from 'src/app/services/diagram-events.service';
import { KeyboardService } from 'src/app/services/keyboard.service';

@Component({
    selector: 'app-diagram',
    templateUrl: './diagram.component.html',
    styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnInit {

    @ViewChild('root') _root: ElementRef;
    private _diagram: Diagram;
    private _pointedItem: DiagramItem;
    private _resizedItem: DiagramItem;
    private _pointedOrResizedItemState: DiagramItemState;
    private _mouseLastPosition: Point;
    private _pointedRelation: Relation;

    constructor(
        private _diagramEventsService: DiagramEventsService,
        private _diagramService: DiagramService,
        private _keyboardService: KeyboardService
    ) {
        var self = this;
        self._diagram = self._diagramService.diagram;
        self._diagramEventsService.diagramLoadedEvent.addHandler((diagram: Diagram) => {
            self._diagram = diagram;
            self._diagram.size = new Size(self._root.nativeElement.offsetWidth, self._root.nativeElement.offsetHeight);
        });
    }

    ngOnInit(): void { }

    get diagram(): Diagram { return this._diagram; }

    onMouseDown(event): void {
        // item selection
        this._pointedItem = this._diagram.getPointedItem();
        this._resizedItem = this._diagram.getResizedItem();
        var pointedOrResizedItem = this._pointedItem ?? this._resizedItem;
        if (!pointedOrResizedItem) {
            this._diagram.clearItemSelectionBut(null);
        } else if (pointedOrResizedItem && !pointedOrResizedItem.isSelected && !this._keyboardService.isControlPressed()) {
            pointedOrResizedItem.isSelected = true;
            this._diagram.clearItemSelectionBut(pointedOrResizedItem);
        } else if (pointedOrResizedItem && !pointedOrResizedItem.isSelected) {
            pointedOrResizedItem.isSelected = true;
        } else if (pointedOrResizedItem && pointedOrResizedItem.isSelected && this._keyboardService.isControlPressed()) {
            pointedOrResizedItem.isSelected = false;
        }
        // relation selection
        this._pointedRelation = this._diagram.getPointedRelation();
        if (!this._pointedRelation) {
            this._diagram.clearRelationSelectionBut(null);
        } else if (this._pointedRelation && !this._pointedRelation.isSelected && !this._keyboardService.isControlPressed()) {
            this._pointedRelation.isSelected = true;
            this._diagram.clearRelationSelectionBut(this._pointedRelation);
        } else if (this._pointedRelation && !this._pointedRelation.isSelected) {
            this._pointedRelation.isSelected = true;
        } else if (this._pointedRelation && this._pointedRelation.isSelected && this._keyboardService.isControlPressed()) {
            this._pointedRelation.isSelected = false;
        }
        if (pointedOrResizedItem) {
            this._pointedOrResizedItemState = pointedOrResizedItem.getState();
            this._mouseLastPosition = new Point(event.x, event.y);
        }
        // selection events
        if (pointedOrResizedItem) {
            this._diagramEventsService.diagramItemSetSelectionEvent.raise(pointedOrResizedItem);
        } else if (this._pointedRelation) {
            this._diagramEventsService.relationSetSelectionEvent.raise(this._pointedRelation);
        } else {
            this._diagramEventsService.diagramClearSelectionEvent.raise();
        }
    }

    onMouseMove(event): void {
        if (this._pointedItem == null && this._resizedItem == null) return;
        var mouseCurrentPosition = new Point(event.x, event.y);
        var deltaX = mouseCurrentPosition.x - this._mouseLastPosition.x;
        var deltaY = mouseCurrentPosition.y - this._mouseLastPosition.y;
        if (this._resizedItem) {
            this._diagram.getSelectedItems().forEach(item => {
                item.resizeDirectionValue = this._resizedItem.resizeDirectionValue;
                this._diagram.resizeItemBy(item, deltaX, deltaY);
            });
        } else if (this._pointedItem) {
            this._diagram.getSelectedItems().forEach(item => this._diagram.moveItemBy(item, deltaX, deltaY));
        }
        this._mouseLastPosition = mouseCurrentPosition;
    }

    onMouseUp(event): void {
        var pointedOrResizedItem = this._pointedItem ?? this._resizedItem;
        var hasMoved = pointedOrResizedItem ? pointedOrResizedItem.position.isEquals(this._pointedOrResizedItemState.position) == false : false;
        var hasResized = pointedOrResizedItem ? pointedOrResizedItem.size.isEquals(this._pointedOrResizedItemState.size) == false : false;
        if (pointedOrResizedItem && pointedOrResizedItem.isSelected && !hasMoved && !hasResized && !this._keyboardService.isControlPressed()) {
            this._diagram.clearItemSelectionBut(pointedOrResizedItem);
            this._diagramEventsService.diagramItemSetSelectionEvent.raise(pointedOrResizedItem);
        }
        if (this._pointedItem) {
            if (hasMoved) {
                var deltaX = this._pointedItem.position.x - this._pointedOrResizedItemState.position.x;
                var deltaY = this._pointedItem.position.y - this._pointedOrResizedItemState.position.y;
                this._diagram.getSelectedItems().forEach(item => {
                    var startPosition = new Point(item.position.x - deltaX, item.position.y - deltaY);
                    this._diagramEventsService.diagramItemMoveEvent.raise({ item: item, startPosition: startPosition });
                });
            }
            this._diagram.getSelectedItems().forEach(item => item.isPointed = false);
            this._pointedItem.isPointed = false;
            this._pointedItem = null;
        }
        if (this._resizedItem) {
            var deltaX = this._resizedItem.position.x - this._pointedOrResizedItemState.position.x;
            var deltaY = this._resizedItem.position.y - this._pointedOrResizedItemState.position.y;
            var deltaWidth = this._resizedItem.size.width - this._pointedOrResizedItemState.size.width;
            var deltaHeight = this._resizedItem.size.height - this._pointedOrResizedItemState.size.height;
            this._diagram.getSelectedItems().forEach(item => {
                var startPosition = new Point(item.position.x - deltaX, item.position.y - deltaY);
                var startSize = new Size(item.size.width - deltaWidth, item.size.height - deltaHeight);
                if (hasResized) this._diagramEventsService.diagramItemResizeEvent.raise({ item: item, startPosition: startPosition, startSize: startSize });
                item.clearResize();
            });
            this._resizedItem = null;
        }
        if (this._pointedRelation) {
            this._diagram.getSelectedRelations().forEach(r => r.isPointed = false);
            this._pointedRelation = null;
        }
    }

    onResize(event: ResizedEvent): void {
        this._diagram.size = new Size(event.newWidth, event.newHeight);
    }
}
