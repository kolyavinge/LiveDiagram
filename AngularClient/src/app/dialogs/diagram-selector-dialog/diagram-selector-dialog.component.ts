import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AvailableDiagram } from 'src/app/contracts/available-diagram';

@Component({
    selector: 'app-diagram-selector-dialog',
    templateUrl: './diagram-selector-dialog.component.html',
    styleUrls: ['./diagram-selector-dialog.component.css']
})
export class DiagramSelectorDialogComponent implements OnInit {

    okEnable: boolean = false;
    selectedDiagram: AvailableDiagram;

    constructor(
        private _dialogRef: MatDialogRef<DiagramSelectorDialogComponent>
    ) { }

    ngOnInit(): void { }

    selectDiagram(selectedDiagram: AvailableDiagram): void {
        this.selectedDiagram = selectedDiagram;
        this.okEnable = true;
    }
}
