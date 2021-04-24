import { Component, OnInit, Input } from '@angular/core';
import { DiagramItem } from 'src/app/model/diagram-item';

@Component({
    selector: 'app-diagram-item',
    templateUrl: './diagram-item.component.html',
    styleUrls: ['./diagram-item.component.css']
})
export class DiagramItemComponent implements OnInit {

    @Input() item: DiagramItem;

    constructor() { }

    ngOnInit(): void {
    }

    onMouseDown(): void {
        var self = this;
        self.item.isPointed = true;
    }

    onMouseUp(): void {
        var self = this;
        self.item.isPointed = false;
    }
}
