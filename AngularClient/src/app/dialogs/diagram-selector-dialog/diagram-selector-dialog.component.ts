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

    private _sort: string = 'title asc';
    private _filterTitleDelayedRequest: DelayedRequest = new DelayedRequest((async _ => {
        await this.loadTotalDiagramsCount();
        await this.pageNumberChange(0);
    }), 1000);

    availableDiagrams: AvailableDiagram[] = [];
    selectedDiagram: AvailableDiagram;
    availableDiagramsLoading: boolean = false;
    availableDiagramsEmpty: boolean = false;
    totalDiagramsCount: number = 0;
    pageNumber: number = 0;
    pageSize: number = 40;
    filterTitle: string = '';
    filterTitlePlaceholder = 'Введите название диаграммы или ее часть';
    okEnable: boolean = false;

    constructor(
        private _dialogRef: MatDialogRef<DiagramSelectorDialogComponent>,
        private _apiService: ApiService
    ) { }

    async ngOnInit(): Promise<any> {
        await this.loadTotalDiagramsCount();
        await this.loadDiagrams();
    }

    async sort(sort: string): Promise<any> {
        if (this._sort !== sort) {
            this._sort = sort;
            await this.pageNumberChange(0);
        }
    }

    selectDiagram(selectedDiagram: AvailableDiagram): void {
        this.selectedDiagram = selectedDiagram;
        this.okEnable = selectedDiagram != null;
    }

    async pageNumberChange(pageNumber: number): Promise<any> {
        this.pageNumber = pageNumber;
        await this.loadDiagrams();
    }

    async filterTitleChange(value: string): Promise<any> {
        this.filterTitle = value;
        this._filterTitleDelayedRequest.send();
    }

    private async loadTotalDiagramsCount(): Promise<any> {
        let response = await this._apiService.getAvailableDiagrams({ countOnly: true, filterTitle: this.filterTitle });
        this.totalDiagramsCount = response.count;
    }

    private async loadDiagrams(): Promise<any> {
        this.availableDiagramsLoading = true;
        this.availableDiagramsEmpty = false;
        this.availableDiagrams = [];
        this.selectDiagram(null);
        if (this.totalDiagramsCount > 0) {
            let params = {
                includeThumbnails: true,
                filterTitle: this.filterTitle,
                sort: this._sort,
                batch: {
                    startIndex: this.pageNumber * this.pageSize,
                    count: this.pageSize
                }
            };
            let response = await this._apiService.getAvailableDiagrams(params);
            this.availableDiagrams = response.availableDiagrams;
        }
        this.availableDiagramsEmpty = this.availableDiagrams.length === 0;
        this.availableDiagramsLoading = false;
    }
}
