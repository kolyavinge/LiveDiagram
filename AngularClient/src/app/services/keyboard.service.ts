import { Injectable } from '@angular/core';
import { CommandService } from './command.service';
import { DiagramService } from './diagram.service';

@Injectable({ providedIn: 'root' })
export class KeyboardService {

    private _isControlPressed: boolean = false;

    constructor(
        private _diagramService: DiagramService,
        private _commandService: CommandService
    ) { }

    onKeyDown(event: KeyboardEvent): void {
        // console.log(event.code);
        if (event.code === 'Delete') {
            let selectedItems = this._diagramService.diagram.getSelectedItems();
            if (selectedItems.length > 0) {
                let cmd = this._commandService.makeDeleteDiagramItemCommand();
                cmd.exec(selectedItems);
            }
            let selectedRelations = this._diagramService.diagram.getSelectedRelations();
            if (selectedRelations.length > 0) {
                let cmd = this._commandService.makeDeleteRelationCommand();
                cmd.exec(selectedRelations);
            }
        } else if (event.code === 'NumpadAdd') {
            let cmd = this._commandService.makeCreateDiagramItemCommand();
            cmd.exec();
        } else if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
            this._isControlPressed = true;
        }
    }

    onKeyUp(event: KeyboardEvent): void {
        if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
            this._isControlPressed = false;
        }
    }

    isControlPressed(): boolean {
        return this._isControlPressed;
    }
}
