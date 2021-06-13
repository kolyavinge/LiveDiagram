import { Component, Input, OnInit } from '@angular/core';
import { SelectionRectangleModel } from './selection-rectangle-model';

@Component({
    selector: 'app-selection-rectangle',
    templateUrl: './selection-rectangle.component.html',
    styleUrls: ['./selection-rectangle.component.css']
})
export class SelectionRectangleComponent implements OnInit {

    @Input() model: SelectionRectangleModel;

    ngOnInit(): void { }
}
