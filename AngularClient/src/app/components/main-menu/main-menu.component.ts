import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { EditDiagramItemDialogComponent } from 'src/app/dialogs/edit-diagram-item-dialog/edit-diagram-item-dialog.component';
import { DiagramItem } from 'src/app/model/diagram-item';
import { DiagramEventsService } from 'src/app/services/diagram-events.service';
import { DiagramService } from 'src/app/services/diagram.service';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

    deleteTitle: string = "Удалить элемент";
    deleteIsDisabled: boolean = true;

    constructor(
        private _diagramService: DiagramService,
        private _diagramEventsService: DiagramEventsService,
        private _dialogService: MatDialog
    ) {
        var self = this;
        self._diagramEventsService.diagramItemSetSelectionEvent.addHandler((item) => {
            self.deleteTitle = "Удалить элемент";
            self.deleteIsDisabled = false;
        });
        self._diagramEventsService.relationSetSelectionEvent.addHandler((relation) => {
            self.deleteTitle = "Удалить связь";
            self.deleteIsDisabled = false;
        });
        self._diagramEventsService.diagramClearSelectionEvent.addHandler(() => {
            self.deleteIsDisabled = true;
        });
    }

    ngOnInit(): void { }

    createDiagramItem(): void {
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

    delete(): void {
        var self = this;
        var selectedItem = self._diagramService.diagram.getSelectedItem();
        if (selectedItem) {
            var dialog = self._dialogService.open(ConfirmDialogComponent);
            dialog.componentInstance.message = 'Вы действительно хотите удалить выбранный элемент?';
            dialog.afterClosed().subscribe(result => {
                if (result) {
                    self._diagramEventsService.diagramItemDeleteEvent.raise([selectedItem]);
                }
            });
        }
        var selectedRelation = self._diagramService.diagram.getSelectedRelation();
        if (selectedRelation) {
            var dialog = self._dialogService.open(ConfirmDialogComponent);
            dialog.componentInstance.message = 'Вы действительно хотите удалить выбранную связь?';
            dialog.afterClosed().subscribe(result => {
                if (result) {
                    self._diagramEventsService.relationDeleteEvent.raise([selectedRelation]);
                }
            });
        }
    }
}
