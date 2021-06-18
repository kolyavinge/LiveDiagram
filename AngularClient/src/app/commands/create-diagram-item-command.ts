import { MatDialog } from '@angular/material/dialog';
import { EditDiagramItemDialogComponent } from '../dialogs/edit-diagram-item-dialog/edit-diagram-item-dialog.component';
import { DiagramEventsService } from '../services/diagram-events.service';

export class CreateDiagramItemCommand {

    private _diagramEventsService: DiagramEventsService;
    private _dialogService: MatDialog;

    constructor(
        dialogService: MatDialog,
        diagramEventsService: DiagramEventsService
    ) {
        this._dialogService = dialogService;
        this._diagramEventsService = diagramEventsService;
    }

    exec(): void {
        let self = this;
        let dialog = self._dialogService.open(EditDiagramItemDialogComponent);
        dialog.afterClosed().subscribe(dialogResult => {
            if (dialogResult) {
                let editItemResult = dialog.componentInstance.getResult();
                self._diagramEventsService.diagramItemAddEvent.raise(editItemResult);
            }
        });
    }
}
