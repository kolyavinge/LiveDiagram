import { Component, OnInit } from '@angular/core';
import { AvailableDiagram } from 'src/app/contracts/available-diagram';
import { ApiService } from 'src/app/services/api.service';
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
    availableDiagrams: AvailableDiagram[] = [];

    constructor(
        private _apiService: ApiService,
        private _diagramService: DiagramService,
        private _diagramEventsService: DiagramEventsService,
        private _commandService: CommandService
    ) {
        var self = this;
        self._apiService.getAvailableDiagrams().then((response) => {
            self.availableDiagrams = response.availableDiagrams;
        });
        self._diagramEventsService.diagramItemSetSelectionEvent.addHandler((item) => {
            self.deleteTitle = self._diagramService.diagram.getSelectedItems().length == 1
                ? "Удалить элемент" : "Удалить элементы";
            self.deleteIsDisabled = false;
        });
        self._diagramEventsService.relationSetSelectionEvent.addHandler((relation) => {
            self.deleteTitle = self._diagramService.diagram.getSelectedRelations().length == 1
                ? "Удалить связь" : "Удалить связи";
            self.deleteIsDisabled = false;
        });
        self._diagramEventsService.diagramClearSelectionEvent.addHandler(() => {
            self.deleteIsDisabled = true;
        });
    }

    ngOnInit(): void { }

    selectDiagram(selectedDiagram: AvailableDiagram): void {
        this._diagramService.loadDiagramById(selectedDiagram.id);
    }

    createDiagramItem(): void {
        var cmd = this._commandService.makeCreateDiagramItemCommand();
        cmd.exec();
    }

    delete(): void {
        var selectedItems = this._diagramService.diagram.getSelectedItems();
        if (selectedItems.length > 0) {
            let cmd = this._commandService.makeDeleteDiagramItemCommand();
            cmd.exec(selectedItems);
        }
        var selectedRelations = this._diagramService.diagram.getSelectedRelations();
        if (selectedRelations.length > 0) {
            let cmd = this._commandService.makeDeleteRelationCommand();
            cmd.exec(selectedRelations);
        }
    }

    layout(): void {
        var cmd = this._commandService.makeLayoutDiagramCommand();
        cmd.exec(this._diagramService.diagram);
    }
}
