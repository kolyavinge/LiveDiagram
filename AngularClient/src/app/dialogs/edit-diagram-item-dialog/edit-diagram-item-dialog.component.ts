import { Component, OnInit } from '@angular/core';
import { DiagramItem } from 'src/app/model/diagram-item';
import { DiagramEventsService } from 'src/app/services/diagram-events.service';

@Component({
    selector: 'app-edit-diagram-item-dialog',
    templateUrl: './edit-diagram-item-dialog.component.html',
    styleUrls: ['./edit-diagram-item-dialog.component.css']
})
export class EditDiagramItemDialogComponent implements OnInit {

    private _item: DiagramItem;
    private _title: string;

    constructor(
        private _diagramEventsService: DiagramEventsService,
    ) { }

    ngOnInit(): void { }

    get item(): DiagramItem { return this._item; }

    set item(value: DiagramItem) {
        this._item = value;
        this._title = this._item.title;
    }

    get title(): string { return this._title; }

    set title(value: string) { this._title = value; }

    saveChanges(): void {
        this._item.title = this._title;
        this._diagramEventsService.diagramItemSetTitleEvent.raise(this._item);
    }
}
