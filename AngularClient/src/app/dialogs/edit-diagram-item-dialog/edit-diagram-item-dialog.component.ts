import { Component, OnInit } from '@angular/core';
import { DiagramItem } from 'src/app/model/diagram-item';
import { InheritanceLogic } from 'src/app/model/inheritance-logic';
import { DiagramService } from 'src/app/services/diagram.service';
import { diagramItemTitleAsc } from 'src/app/infrastructure/compare-funcs';
import { Relation } from 'src/app/model/relation';

@Component({
    selector: 'app-edit-diagram-item-dialog',
    templateUrl: './edit-diagram-item-dialog.component.html',
    styleUrls: ['./edit-diagram-item-dialog.component.css']
})
export class EditDiagramItemDialogComponent implements OnInit {

    private _item: DiagramItem;
    private _title: string;
    private _availableParents: DiagramItem[] = [];
    private _oldParentRelation: Relation;
    private _oldParent: DiagramItem;
    private _newParent: DiagramItem;

    constructor(
        private _diagramService: DiagramService
    ) { }

    ngOnInit(): void { }

    get item(): DiagramItem { return this._item; }

    set item(value: DiagramItem) {
        this._item = value;
        this._title = this._item.title;
        this.setAvailableParentsAndCurrentParent();
    }

    get title(): string { return this._title; }

    set title(value: string) { this._title = value; }

    get availableParents(): DiagramItem[] { return this._availableParents; }

    get oldParentRelation(): Relation { return this._oldParentRelation; }

    get oldParent(): DiagramItem { return this._oldParent; }

    get newParentRelation(): Relation {
        if (!this._newParent) return null;
        var relation = new Relation();
        relation.setDiagramItems(this._newParent, this._item);
        return relation;
    }

    get newParent(): DiagramItem { return this._newParent; }

    parentHasChanged(): boolean {
        if (!this._oldParent && !this._newParent) return false;
        if (!this._oldParent && this._newParent) return true;
        if (this._oldParent && !this._newParent) return true;
        return this._oldParent.isEquals(this._newParent) == false;
    }

    onParentChange(id: string): void {
        if (id == "0") {
            this._newParent = null;
        } else {
            this._newParent = this._diagramService.diagram.getItemById(id);
        }
    }

    saveChanges(): void {
        this._item.title = this._title;
    }

    private setAvailableParentsAndCurrentParent(): void {
        var logic = new InheritanceLogic();
        this._availableParents = logic.getAvailableParents(this._diagramService.diagram, this._item);
        this._availableParents.sort(diagramItemTitleAsc);
        this._oldParentRelation = logic.getParentRelation(this._diagramService.diagram, this._item);
        this._oldParent = logic.getParent(this._diagramService.diagram, this._item);
        this._newParent = this._oldParent;
    }
}
