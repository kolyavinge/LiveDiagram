import { Component, OnInit } from '@angular/core';
import { Command } from 'src/app/common/command';
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

    availableDiagrams: AvailableDiagram[] = [];
    createDiagramItemCommand: Command;
    deleteCommand: Command;
    layoutDiagramCommand: Command;
    saveDiagramCommand: Command;

    constructor(
        private _apiService: ApiService,
        private _diagramService: DiagramService,
        private _diagramEventsService: DiagramEventsService,
        private _commandService: CommandService
    ) {
        let self = this;
        self._apiService.getAvailableDiagrams().then(response => {
            self.availableDiagrams = response.availableDiagrams;
        });
        self.createDiagramItemCommand = self._commandService.makeCreateDiagramItemCommand();
        self.deleteCommand = self._commandService.makeDeleteDiagramItemRelationCommand();
        self.layoutDiagramCommand = self._commandService.makeLayoutDiagramCommand();
        self.saveDiagramCommand = self._commandService.makeSaveDiagramCommand();
    }

    ngOnInit(): void { }

    get diagramTitle(): string { return this._diagramService.diagram.title; }

    set diagramTitle(value: string) {
        this._diagramEventsService.diagramSetTitleEvent.raise(value);
    }

    selectDiagram(selectedDiagram: AvailableDiagram): void {
        this._diagramService.loadDiagramById(selectedDiagram.id);
    }
}
