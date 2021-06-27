import { MatDialog } from '@angular/material/dialog';
import { Command } from '../common/command';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { DiagramEventsService } from '../services/diagram-events.service';
import { DiagramService } from '../services/diagram.service';

export class DeleteDiagramItemRelationCommand extends Command {

    private _title: string = 'Удалить элемент';
    private _isEnabled: boolean = false;

    constructor(
        private _dialogService: MatDialog,
        private _diagramService: DiagramService,
        private _diagramEventsService: DiagramEventsService
    ) {
        super();
        let self = this;
        self._diagramEventsService.diagramItemSetSelectionEvent.addHandler(items => {
            self._title = self._diagramService.diagram.getSelectedItems().length === 1 ? 'Удалить элемент' : 'Удалить элементы';
            self._isEnabled = true;
        });
        self._diagramEventsService.relationSetSelectionEvent.addHandler(relations => {
            self._title = self._diagramService.diagram.getSelectedRelations().length === 1 ? 'Удалить связь' : 'Удалить связи';
            self._isEnabled = true;
        });
        self._diagramEventsService.diagramClearSelectionEvent.addHandler(() => {
            self._isEnabled = false;
        });
    }

    protected execInner(): void {
        let self = this;

        let selectedItems = self._diagramService.diagram.getSelectedItems();
        if (selectedItems.length > 0) {
            let dialog = self._dialogService.open(ConfirmDialogComponent);
            dialog.componentInstance.message = selectedItems.length === 1
                ? 'Вы действительно хотите удалить выбранный элемент?' : 'Вы действительно хотите удалить выбранные элементы?';
            dialog.afterClosed().subscribe(result => {
                if (result) {
                    self._diagramEventsService.diagramItemDeleteEvent.raise(selectedItems);
                    self._isEnabled = false;
                }
            });
        }

        let selectedRelations = self._diagramService.diagram.getSelectedRelations();
        if (selectedRelations.length > 0) {
            let dialog = self._dialogService.open(ConfirmDialogComponent);
            dialog.componentInstance.message = selectedRelations.length === 1
                ? 'Вы действительно хотите удалить выбранную связь?' : 'Вы действительно хотите удалить выбранные связи?';
            dialog.afterClosed().subscribe(result => {
                if (result) {
                    self._diagramEventsService.relationDeleteEvent.raise(selectedRelations);
                    self._isEnabled = false;
                }
            });
        }
    }

    get title(): string { return this._title; }

    get isEnabled(): boolean { return this._isEnabled; }
}
