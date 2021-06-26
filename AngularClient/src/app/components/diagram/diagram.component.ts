import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { Point, Size } from 'src/app/common/geometry';
import { DiagramItem, DiagramItemState } from 'src/app/model/diagram-item';
import { Relation } from 'src/app/model/relation';
import { Diagram } from 'src/app/model/diagram';
import { DiagramService } from 'src/app/services/diagram.service';
import { DiagramEventsService } from 'src/app/services/diagram-events.service';
import { KeyboardService } from 'src/app/services/keyboard.service';
import { SelectionRectangleModel } from '../selection-rectangle/selection-rectangle-model';
import Utils from 'src/app/common/utils';

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

    selectionRectangleModel: SelectionRectangleModel = new SelectionRectangleModel();

    constructor(
        private _diagramEventsService: DiagramEventsService,
        private _diagramService: DiagramService,
        private _keyboardService: KeyboardService
    ) {
        let self = this;
        self._diagram = self._diagramService.diagram;
        self._diagramEventsService.diagramLoadEvent.addHandler((diagram: Diagram) => {
            self._diagram = diagram;
            self._diagram.size = new Size(self._root.nativeElement.offsetWidth, self._root.nativeElement.offsetHeight);
        });
    }

    ngOnInit(): void { }

    get diagram(): Diagram { return this._diagram; }

    onMouseDown(event: MouseEvent): void {
        // item selection
        this._pointedItem = this._diagram.getPointedItem();
        this._resizedItem = this._diagram.getResizedItem();
        let pointedOrResizedItem = this._pointedItem ?? this._resizedItem;
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
        // selection rectangle
        if (!pointedOrResizedItem) {
            this.selectionRectangleModel.setStartPoint(Utils.pointInElement(this._root, event));
        }
    }

    onMouseMove(event: MouseEvent): void {
        if (this._pointedItem != null || this._resizedItem != null) {
            let mouseCurrentPosition = new Point(event.x, event.y);
            let deltaX = mouseCurrentPosition.x - this._mouseLastPosition.x;
            let deltaY = mouseCurrentPosition.y - this._mouseLastPosition.y;
            if (this._resizedItem) {
                this._diagram.getSelectedItems().forEach(item => {
                    item.resizeDirectionValue = this._resizedItem.resizeDirectionValue;
                    this._diagram.resizeItemBy(item, deltaX, deltaY);
                });
            } else if (this._pointedItem) {
                this._diagram.getSelectedItems().forEach(item => this._diagram.moveItemBy(item, deltaX, deltaY));
            }
            this._mouseLastPosition = mouseCurrentPosition;
        } else if (this.selectionRectangleModel.isActive) {
            this.diagram.items.forEach(i => i.isSelected = false);
            this.selectionRectangleModel.setEndPoint(Utils.pointInElement(this._root, event));
            let selectedItems = this.selectionRectangleModel.getSelectedItems(this.diagram.items);
            selectedItems.forEach(i => i.isSelected = true);
        }
    }

    onMouseUp(event: MouseEvent): void {
        let pointedOrResizedItem = this._pointedItem ?? this._resizedItem;
        let hasMoved = pointedOrResizedItem ? pointedOrResizedItem.position.isEquals(this._pointedOrResizedItemState.position) === false : false;
        let hasResized = pointedOrResizedItem ? pointedOrResizedItem.size.isEquals(this._pointedOrResizedItemState.size) === false : false;
        if (pointedOrResizedItem && pointedOrResizedItem.isSelected && !hasMoved && !hasResized && !this._keyboardService.isControlPressed()) {
            this._diagram.clearItemSelectionBut(pointedOrResizedItem);
            this._diagramEventsService.diagramItemSetSelectionEvent.raise(pointedOrResizedItem);
        }
        if (this._pointedItem) {
            if (hasMoved) {
                let deltaX = this._pointedItem.position.x - this._pointedOrResizedItemState.position.x;
                let deltaY = this._pointedItem.position.y - this._pointedOrResizedItemState.position.y;
                let items = this._diagram.getSelectedItems().map(item =>
                    ({ item: item, startPosition: new Point(item.position.x - deltaX, item.position.y - deltaY) })
                );
                this._diagramEventsService.diagramItemMoveEvent.raise({ items: items });
            }
            this._diagram.getSelectedItems().forEach(item => item.isPointed = false);
            this._pointedItem.isPointed = false;
            this._pointedItem = null;
        }
        if (this._resizedItem) {
            let deltaX = this._resizedItem.position.x - this._pointedOrResizedItemState.position.x;
            let deltaY = this._resizedItem.position.y - this._pointedOrResizedItemState.position.y;
            let deltaWidth = this._resizedItem.size.width - this._pointedOrResizedItemState.size.width;
            let deltaHeight = this._resizedItem.size.height - this._pointedOrResizedItemState.size.height;
            this._diagram.getSelectedItems().forEach(item => {
                let startPosition = new Point(item.position.x - deltaX, item.position.y - deltaY);
                let startSize = new Size(item.size.width - deltaWidth, item.size.height - deltaHeight);
                if (hasResized) this._diagramEventsService.diagramItemResizeEvent.raise({ item: item, startPosition: startPosition, startSize: startSize });
                item.clearResize();
            });
            this._resizedItem = null;
        }
        if (this._pointedRelation) {
            this._diagram.getSelectedRelations().forEach(r => r.isPointed = false);
            this._pointedRelation = null;
        }
        // selection rectangle
        if (this.selectionRectangleModel.isActive) {
            this.selectionRectangleModel.clear();
        }
    }

    onResize(event: ResizedEvent): void {
        this._diagram.size = new Size(event.newWidth, event.newHeight);
    }
}
