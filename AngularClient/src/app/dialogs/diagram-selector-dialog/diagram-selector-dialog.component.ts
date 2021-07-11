import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AvailableDiagram } from 'src/app/contracts/available-diagram';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-diagram-selector-dialog',
    templateUrl: './diagram-selector-dialog.component.html',
    styleUrls: ['./diagram-selector-dialog.component.css']
})
export class DiagramSelectorDialogComponent implements OnInit {

    okEnable: boolean = false;
    selectedDiagram: AvailableDiagram;
    pageNumber: number = 0;
    totalItemsCount: number = 0;

    constructor(
        private _dialogRef: MatDialogRef<DiagramSelectorDialogComponent>,
        private _apiService: ApiService
    ) { }

    ngOnInit(): void {
        this.totalItemsCount = 0;
        this._apiService.getAvailableDiagrams({ countOnly: true }).then(response => {
            this.totalItemsCount = response.count;
        });
    }

    selectDiagram(selectedDiagram: AvailableDiagram): void {
        this.selectedDiagram = selectedDiagram;
        this.okEnable = true;
    }
}
