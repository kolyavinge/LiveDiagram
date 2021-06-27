import { MatDialog } from '@angular/material/dialog';
import { Command } from '../common/command';
import { DiagramItem } from '../model/diagram-item';
import { EditDiagramItemDialogComponent } from '../dialogs/edit-diagram-item-dialog/edit-diagram-item-dialog.component';
import { DiagramEventsService } from '../services/diagram-events.service';

export class EditDiagramItemCommand extends Command {

    constructor(
        private _dialogService: MatDialog,
        private _diagramEventsService: DiagramEventsService,
        private _item: DiagramItem) {
        super();
    }

    protected execInner(): void {
        let self = this;
        let dialog = self._dialogService.open(EditDiagramItemDialogComponent);
        dialog.componentInstance.item = this._item;
        dialog.afterClosed().subscribe(dialogResult => {
            if (dialogResult) {
                let editItemResult = dialog.componentInstance.getResult();
                self._diagramEventsService.diagramItemEditEvent.raise(editItemResult);
            }
        });
    }

    get title(): string { return 'Редактировать элемент'; }
}
