import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDiagramItemDialogComponent } from 'src/app/dialogs/edit-diagram-item-dialog/edit-diagram-item-dialog.component';
import { DiagramItem } from 'src/app/model/diagram-item';
import { DiagramEventsService } from 'src/app/services/diagram-events.service';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

    constructor(
        private _diagramEventsService: DiagramEventsService,
        private _dialogService: MatDialog
    ) { }

    ngOnInit(): void {
    }

    createDiagramElement(): void {
        var self = this;
        var newDiagramItem = new DiagramItem();
        newDiagramItem.setPosition(100, 100);
        newDiagramItem.setSize(120, 160);
        var dialog = self._dialogService.open(EditDiagramItemDialogComponent);
        dialog.componentInstance.item = newDiagramItem;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                dialog.componentInstance.saveChanges();
                self._diagramEventsService.diagramItemAddEvent.raise(newDiagramItem);
            }
        });
    }
}
