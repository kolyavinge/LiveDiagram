import { Component, OnInit, Input } from '@angular/core';
import { DiagramItem } from 'src/app/model/diagram-item';
import { ResizeDirection } from 'src/app/model/resize-direction';

@Component({
    selector: 'app-diagram-item',
    templateUrl: './diagram-item.component.html',
    styleUrls: ['./diagram-item.component.css']
})
export class DiagramItemComponent implements OnInit {

    resize: ResizeDirection = new ResizeDirection();
    @Input() item: DiagramItem;

    constructor() { }

    ngOnInit(): void {
    }

    onMouseDown(): void {
        this.item.isPointed = true;
    }

    onMouseUp(): void {
        this.item.isPointed = false;
    }

    onResizeMouseDown(resizeDirectionValue: number): void {
        this.item.resizeDirectionValue = resizeDirectionValue;
    }

    onResizeMouseUp(): void {
        this.item.clearResize();
    }
}
