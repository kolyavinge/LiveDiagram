import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { DiagramItem } from '../model/diagram-item';
import { DiagramEventsService } from '../services/diagram-events.service';

export class DeleteDiagramItemCommand {

    private _diagramEventsService: DiagramEventsService;
    private _dialogService: MatDialog;

    constructor(
        dialogService: MatDialog,
        diagramEventsService: DiagramEventsService
    ) {
        this._dialogService = dialogService;
        this._diagramEventsService = diagramEventsService;
    }

    exec(items: DiagramItem[]): void {
        let self = this;
        let dialog = self._dialogService.open(ConfirmDialogComponent);
        dialog.componentInstance.message = items.length === 1
            ? 'Вы действительно хотите удалить выбранный элемент?' : 'Вы действительно хотите удалить выбранные элементы?';
        dialog.afterClosed().subscribe(result => {
            if (result) {
                self._diagramEventsService.diagramItemDeleteEvent.raise(items);
            }
        });
    }
}
