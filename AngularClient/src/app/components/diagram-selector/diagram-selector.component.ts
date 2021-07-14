import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { AvailableDiagram } from 'src/app/contracts/available-diagram';

@Component({
    selector: 'app-diagram-selector',
    templateUrl: './diagram-selector.component.html',
    styleUrls: ['./diagram-selector.component.css']
})
export class DiagramSelectorComponent implements OnInit {

    private _availableDiagrams: AvailableDiagram[] = [];

    selectedDiagramId: string = '';
    @Output() selectedDiagramChange = new EventEmitter<AvailableDiagram>();
    @Input() availableDiagramsLoading: boolean = false;

    get availableDiagrams(): AvailableDiagram[] {
        return this._availableDiagrams;
    }

    @Input() set availableDiagrams(value: AvailableDiagram[]) {
        this._availableDiagrams = value;
        this.selectDiagram(null);
    }

    constructor() { }

    ngOnInit(): void { }

    selectDiagram(selectedDiagram: AvailableDiagram): void {
        this.selectedDiagramId = selectedDiagram ? selectedDiagram.id : null;
        this.selectedDiagramChange.emit(selectedDiagram);
    }
}
