import { Injectable } from '@angular/core';
import { CommandService } from './command.service';
import { DiagramService } from './diagram.service';

@Injectable({ providedIn: 'root' })
export class KeyboardService {

    constructor(
        private _diagramService: DiagramService,
        private _commandService: CommandService
    ) { }

    onKeyDown(event: KeyboardEvent) {
        // console.log(event.code);
        if (event.code == "Delete") {
            var selectedItem = this._diagramService.diagram.getSelectedItem();
            if (selectedItem) {
                let cmd = this._commandService.makeDeleteDiagramItemCommand();
                cmd.exec(selectedItem);
            }
            var selectedRelation = this._diagramService.diagram.getSelectedRelation();
            if (selectedRelation) {
                let cmd = this._commandService.makeDeleteRelationCommand();
                cmd.exec(selectedRelation);
            }
        } else if (event.code == "NumpadAdd") {
            let cmd = this._commandService.makeCreateDiagramItemCommand();
            cmd.exec();
        }
    }
}
