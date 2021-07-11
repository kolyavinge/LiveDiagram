import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { AvailableDiagram } from 'src/app/contracts/available-diagram';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-diagram-selector',
    templateUrl: './diagram-selector.component.html',
    styleUrls: ['./diagram-selector.component.css']
})
export class DiagramSelectorComponent implements OnInit {

    private _pageNumber: number = 0;

    @Input() pageSize: number = 0;
    @Output() selectedDiagramChange = new EventEmitter<AvailableDiagram>();
    availableDiagrams: AvailableDiagram[] = [];
    selectedDiagramId: string = '';
    availableDiagramsLoading: boolean = false;

    constructor(
        private _apiService: ApiService
    ) { }

    @Input() set pageNumber(value: number) {
        this._pageNumber = value;
        this.loadDiagrams();
    }

    ngOnInit(): void { }

    selectDiagram(selectedDiagram: AvailableDiagram): void {
        this.selectedDiagramId = selectedDiagram.id;
        this.selectedDiagramChange.emit(selectedDiagram);
    }

    private loadDiagrams(): void {
        if (this.pageSize === 0) return;
        let params = {
            includeThumbnails: true,
            batch: {
                startIndex: this._pageNumber * this.pageSize,
                count: this.pageSize
            }
        };
        this.availableDiagrams = [];
        this.availableDiagramsLoading = true;
        this._apiService.getAvailableDiagrams(params).then(response => {
            this.availableDiagrams = response.availableDiagrams;
            this.availableDiagramsLoading = false;
        });
    }
}
