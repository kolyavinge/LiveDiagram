import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AvailableDiagram } from 'src/app/contracts/available-diagram';
import { DelayedRequest } from 'src/app/infrastructure/delayed-request';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-diagram-selector-dialog',
    templateUrl: './diagram-selector-dialog.component.html',
    styleUrls: ['./diagram-selector-dialog.component.css']
})
export class DiagramSelectorDialogComponent implements OnInit {

    availableDiagrams: AvailableDiagram[] = [];
    availableDiagramsLoading: boolean = false;
    okEnable: boolean = false;
    selectedDiagram: AvailableDiagram;
    pageNumber: number = 0;
    pageSize: number = 40;
    totalDiagramsCount: number = 0;
    filterTitle: string = '';
    filterTitlePlaceholder = 'Введите название диаграммы или ее часть';

    constructor(
        private _dialogRef: MatDialogRef<DiagramSelectorDialogComponent>,
        private _apiService: ApiService
    ) { }

    async ngOnInit(): Promise<any> {
        await this.loadTotalDiagramsCount();
        await this.loadDiagrams();
    }

    selectDiagram(selectedDiagram: AvailableDiagram): void {
        this.selectedDiagram = selectedDiagram;
        this.okEnable = selectedDiagram ? true : false;
    }

    async pageNumberChange(pageNumber: number): Promise<any> {
        this.pageNumber = pageNumber;
        await this.loadDiagrams();
    }

    async filterTitleChange(value: string): Promise<any> {
        this.filterTitle = value;
        this._filterTitleDelayedRequest.send();
    }

    private _filterTitleDelayedRequest: DelayedRequest = new DelayedRequest((async _ => {
        await this.loadTotalDiagramsCount();
        await this.pageNumberChange(0);
    }), 1000);

    private async loadTotalDiagramsCount(): Promise<any> {
        let response = await this._apiService.getAvailableDiagrams({ countOnly: true, filterTitle: this.filterTitle });
        this.totalDiagramsCount = response.count;
    }

    private async loadDiagrams(): Promise<any> {
        this.availableDiagrams = [];
        this.availableDiagramsLoading = true;
        if (this.totalDiagramsCount > 0) {
            let params = {
                includeThumbnails: true,
                filterTitle: this.filterTitle,
                batch: {
                    startIndex: this.pageNumber * this.pageSize,
                    count: this.pageSize
                }
            };
            let response = await this._apiService.getAvailableDiagrams(params);
            this.availableDiagrams = response.availableDiagrams;
        }
        this.availableDiagramsLoading = false;
    }
}
