import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { Relation } from '../model/relation';
import { DiagramEventsService } from '../services/diagram-events.service';

export class DeleteRelationCommand {

    private _diagramEventsService: DiagramEventsService;
    private _dialogService: MatDialog;

    constructor(
        dialogService: MatDialog,
        diagramEventsService: DiagramEventsService
    ) {
        this._dialogService = dialogService;
        this._diagramEventsService = diagramEventsService;
    }

    exec(relations: Relation[]): void {
        let self = this;
        let dialog = self._dialogService.open(ConfirmDialogComponent);
        dialog.componentInstance.message = relations.length === 1
            ? 'Вы действительно хотите удалить выбранную связь?' : 'Вы действительно хотите удалить выбранные связи?';
        dialog.afterClosed().subscribe(result => {
            if (result) {
                self._diagramEventsService.relationDeleteEvent.raise(relations);
            }
        });
    }
}
