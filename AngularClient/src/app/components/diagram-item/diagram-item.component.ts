import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResizeDirection } from 'src/app/model/resize-direction';
import { DiagramItem } from 'src/app/model/diagram-item';
import { EditDiagramItemDialogComponent } from 'src/app/dialogs/edit-diagram-item-dialog/edit-diagram-item-dialog.component';

@Component({
    selector: 'app-diagram-item',
    templateUrl: './diagram-item.component.html',
    styleUrls: ['./diagram-item.component.css']
})
export class DiagramItemComponent implements OnInit {

    resize: ResizeDirection = new ResizeDirection();
    @Input() item: DiagramItem;

    constructor(
        private dialogService: MatDialog
    ) { }

    ngOnInit(): void { }

    onMouseDown(): void {
        this.item.isPointed = true;
        this.item.isSelected = true;
    }

    onMouseUp(): void { }

    onResizeMouseDown(resizeDirectionValue: number): void {
        this.item.resizeDirectionValue = resizeDirectionValue;
    }

    onResizeMouseUp(): void { }

    editItem(): void {
        var self = this;
        var dialog = self.dialogService.open(EditDiagramItemDialogComponent);
        dialog.componentInstance.setItem(this.item);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                dialog.componentInstance.saveChanges();
            }
        });
    }
}
