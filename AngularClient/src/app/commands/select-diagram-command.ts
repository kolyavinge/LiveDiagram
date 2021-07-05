import { MatDialog } from '@angular/material/dialog';
import { Command } from '../common/command';
import { DiagramSelectorDialogComponent } from '../dialogs/diagram-selector-dialog/diagram-selector-dialog.component';
import { DiagramService } from '../services/diagram.service';

export class SelectDiagramCommand extends Command {

    constructor(
        private _dialogService: MatDialog,
        private _diagramService: DiagramService) {
        super();
    }

    protected execInner(): void {
        let self = this;
        let dialog = this._dialogService.open(DiagramSelectorDialogComponent);
        dialog.afterClosed().subscribe(dialogResult => {
            if (dialogResult) {
                self._diagramService.loadDiagramById(dialog.componentInstance.selectedDiagram.id);
            }
        })
    }

    get title(): string { return 'Выбрать диаграмму'; }
}
