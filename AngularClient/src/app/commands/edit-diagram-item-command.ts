import { MatDialog } from '@angular/material/dialog';
import { DiagramItem } from '../model/diagram-item';
import { EditDiagramItemDialogComponent } from '../dialogs/edit-diagram-item-dialog/edit-diagram-item-dialog.component';
import { DiagramEventsService } from '../services/diagram-events.service';

export class EditDiagramItemCommand {

    private _diagramEventsService: DiagramEventsService;
    private _dialogService: MatDialog;

    constructor(
        dialogService: MatDialog,
        diagramEventsService: DiagramEventsService
    ) {
        this._dialogService = dialogService;
        this._diagramEventsService = diagramEventsService;
    }

    exec(item: DiagramItem): void {
        let self = this;
        let dialog = self._dialogService.open(EditDiagramItemDialogComponent);
        dialog.componentInstance.item = item;
        dialog.afterClosed().subscribe(dialogResult => {
            if (dialogResult) {
                let editItemResult = dialog.componentInstance.getResult();
                self._diagramEventsService.diagramItemEditEvent.raise(editItemResult);
            }
        });
    }
}
