import { Component, OnInit } from '@angular/core';
import { DiagramItem } from 'src/app/model/diagram-item';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-edit-diagram-item-dialog',
    templateUrl: './edit-diagram-item-dialog.component.html',
    styleUrls: ['./edit-diagram-item-dialog.component.css']
})
export class EditDiagramItemDialogComponent implements OnInit {

    item: DiagramItem;
    title: string;

    constructor(
        private apiService: ApiService,
    ) { }

    ngOnInit(): void { }

    setItem(item: DiagramItem): void {
        this.item = item;
        this.title = this.item.title;
    }

    saveChanges(): void {
        this.item.title = this.title;
        this.apiService.diagramItemSetTitle(this.item);
    }
}
