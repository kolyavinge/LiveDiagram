import { Component, OnInit } from '@angular/core';
import { CommandService } from 'src/app/services/command.service';
import { DiagramEventsService } from 'src/app/services/diagram-events.service';
import { DiagramService } from 'src/app/services/diagram.service';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css', '../../common.css']
})
export class MainMenuComponent implements OnInit {

    deleteTitle: string = "Удалить элемент";
    deleteIsDisabled: boolean = true;

    constructor(
        private _diagramService: DiagramService,
        private _diagramEventsService: DiagramEventsService,
        private _commandService: CommandService
    ) {
        var self = this;
        self._diagramEventsService.diagramItemSetSelectionEvent.addHandler((item) => {
            self.deleteTitle = "Удалить элемент";
            self.deleteIsDisabled = false;
        });
        self._diagramEventsService.relationSetSelectionEvent.addHandler((relation) => {
            self.deleteTitle = "Удалить связь";
            self.deleteIsDisabled = false;
        });
        self._diagramEventsService.diagramClearSelectionEvent.addHandler(() => {
            self.deleteIsDisabled = true;
        });
    }

    ngOnInit(): void { }

    createDiagramItem(): void {
        var cmd = this._commandService.makeCreateDiagramItemCommand();
        cmd.exec();
    }

    delete(): void {
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
    }
}
