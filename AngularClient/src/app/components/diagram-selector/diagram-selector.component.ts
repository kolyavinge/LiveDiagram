import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { AvailableDiagram } from 'src/app/contracts/available-diagram';

@Component({
    selector: 'app-diagram-selector',
    templateUrl: './diagram-selector.component.html',
    styleUrls: ['./diagram-selector.component.css']
})
export class DiagramSelectorComponent implements OnInit {

    @Input() availableDiagrams: AvailableDiagram[];
    @Input() selectedDiagram: AvailableDiagram;
    @Output() selectedDiagramChange = new EventEmitter<AvailableDiagram>();
    @Input() loading: boolean = false;
    @Input() showEmpty: boolean = false;

    constructor() { }

    ngOnInit(): void { }

    selectDiagram(selectedDiagram: AvailableDiagram): void {
        this.selectedDiagram = selectedDiagram;
        this.selectedDiagramChange.emit(selectedDiagram);
    }
}
