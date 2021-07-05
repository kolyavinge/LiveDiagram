import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { AvailableDiagram } from 'src/app/contracts/available-diagram';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-diagram-selector',
    templateUrl: './diagram-selector.component.html',
    styleUrls: ['./diagram-selector.component.css']
})
export class DiagramSelectorComponent implements OnInit {

    @Output() selectedDiagram = new EventEmitter<AvailableDiagram>();
    availableDiagrams: AvailableDiagram[] = [];
    selectedDiagramId: string = "";

    constructor(
        private _apiService: ApiService
    ) { }

    ngOnInit(): void {
        this._apiService.getAvailableDiagrams({ includeThumbnails: true }).then(response => {
            this.availableDiagrams = response.availableDiagrams;
        });
    }

    selectDiagram(selectedDiagram: AvailableDiagram): void {
        this.selectedDiagramId = selectedDiagram.id;
        this.selectedDiagram.emit(selectedDiagram);
    }
}
