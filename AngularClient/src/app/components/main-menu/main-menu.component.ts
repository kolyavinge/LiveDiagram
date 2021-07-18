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

    availableDiagramsLoading: boolean = false;
    availableDiagrams: AvailableDiagram[] = [];
    selectDiagramCommand: Command;
    createDiagramCommand: Command;
    createDiagramItemCommand: Command;
    addRelationCommand: Command;
    deleteCommand: Command;
    layoutDiagramCommand: Command;
    saveDiagramCommand: Command;

    constructor(
        private _apiService: ApiService,
        private _diagramService: DiagramService,
        private _diagramEventsService: DiagramEventsService,
        private _commandService: CommandService
    ) {
        this.selectDiagramCommand = this._commandService.makeSelectDiagramCommand();
        this.createDiagramCommand = this._commandService.makeCreateDiagramCommand();
        this.createDiagramItemCommand = this._commandService.makeCreateDiagramItemCommand();
        this.addRelationCommand = this._commandService.makeAddRelationCommand();
        this.deleteCommand = this._commandService.makeDeleteDiagramItemRelationCommand();
        this.layoutDiagramCommand = this._commandService.makeLayoutDiagramCommand();
        this.saveDiagramCommand = this._commandService.makeSaveDiagramCommand();
    }

    ngOnInit(): void { }

    async onAvailableDiagramsOpen(): Promise<any> {
        this.availableDiagramsLoading = true;
        this.availableDiagrams = [];
        let result = await this._apiService.getAvailableDiagrams({ sort: 'update desc', batch: { startIndex: 0, count: 10 } });
        this.availableDiagrams = result.availableDiagrams;
        this.availableDiagramsLoading = false;
    }

    get diagramTitle(): string { return this._diagramService.diagram.title; }

    set diagramTitle(value: string) {
        this._diagramEventsService.diagramSetTitleEvent.raise(value);
    }

    selectDiagram(selectedDiagram: AvailableDiagram): void {
        this._diagramService.loadDiagramById(selectedDiagram.id);
    }
}
