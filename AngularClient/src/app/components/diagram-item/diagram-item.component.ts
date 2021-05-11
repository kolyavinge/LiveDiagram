import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResizeDirection } from 'src/app/model/resize-direction';
import { DiagramItem } from 'src/app/model/diagram-item';
import { DiagramEventsService } from 'src/app/services/diagram-events.service';
import { EditDiagramItemDialogComponent } from 'src/app/dialogs/edit-diagram-item-dialog/edit-diagram-item-dialog.component';

@Component({
    selector: 'app-diagram-item',
    templateUrl: './diagram-item.component.html',
    styleUrls: ['./diagram-item.component.css']
})
export class DiagramItemComponent implements OnInit {

    @Input() item: DiagramItem;
    private _resize: ResizeDirection = new ResizeDirection();

    constructor(
        private _diagramEventsService: DiagramEventsService,
        private _dialogService: MatDialog
    ) { }

    ngOnInit(): void { }

    get resize(): ResizeDirection { return this._resize; }

    onMouseDown(): void {
        this.item.isPointed = true;
        this.item.isSelected = true;
    }

    onResizeMouseDown(resizeDirectionValue: number): void {
        this.item.resizeDirectionValue = resizeDirectionValue;
    }

    editItem(): void {
        var self = this;
        var dialog = self._dialogService.open(EditDiagramItemDialogComponent);
        dialog.componentInstance.item = this.item;
        dialog.afterClosed().subscribe(dialogResult => {
            if (dialogResult) {
                var editItemResult = dialog.componentInstance.getResult();
                self._diagramEventsService.diagramItemEditEvent.raise(editItemResult);
            }
        });
    }
}
