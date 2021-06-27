import { MatDialog } from '@angular/material/dialog';
import { Command } from '../common/command';
import { EditDiagramItemDialogComponent } from '../dialogs/edit-diagram-item-dialog/edit-diagram-item-dialog.component';
import { DiagramEventsService } from '../services/diagram-events.service';

export class CreateDiagramItemCommand extends Command {

    constructor(
        private _dialogService: MatDialog,
        private _diagramEventsService: DiagramEventsService) {
        super();
    }

    protected execInner(): void {
        let self = this;
        let dialog = self._dialogService.open(EditDiagramItemDialogComponent);
        dialog.afterClosed().subscribe(dialogResult => {
            if (dialogResult) {
                let editItemResult = dialog.componentInstance.getResult();
                self._diagramEventsService.diagramItemAddEvent.raise(editItemResult);
            }
        });
    }

    get title(): string { return 'Создать элемент'; }
}
