import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EditDiagramItemResult } from 'src/app/contracts/edit-diagram-item-result';
import { DiagramItem } from 'src/app/model/diagram-item';
import { Method } from 'src/app/model/method';
import { InheritanceLogic } from 'src/app/model/inheritance-logic';
import { DiagramService } from 'src/app/services/diagram.service';
import { diagramItemTitleAsc } from 'src/app/infrastructure/compare-funcs';

@Component({
    selector: 'app-edit-diagram-item-dialog',
    templateUrl: './edit-diagram-item-dialog.component.html',
    styleUrls: ['./edit-diagram-item-dialog.component.css']
})
export class EditDiagramItemDialogComponent implements OnInit {

    private _item: DiagramItem;
    private _title: string = "";
    private _availableParents: DiagramItem[] = null;
    private _currentParent: DiagramItem = null;
    private _methods: Method[] = [];
    private _currentMethod: Method = null;
    private _currentMethodIndex: number;

    constructor(
        private _dialogRef: MatDialogRef<EditDiagramItemDialogComponent>,
        private _diagramService: DiagramService
    ) { }

    ngOnInit(): void { }

    get item(): DiagramItem { return this._item; }

    set item(value: DiagramItem) {
        this._item = value;
        this._title = this._item.title;
        var logic = new InheritanceLogic();
        this._currentParent = logic.getParent(this._diagramService.diagram, this._item);
        this._methods = this._item.methods.map(m => m.copy());
    }

    get title(): string { return this._title; }

    set title(value: string) { this._title = value; }

    get availableParents(): DiagramItem[] {
        if (this._availableParents == null) {
            var logic = new InheritanceLogic();
            this._availableParents = logic.getAvailableParents(this._diagramService.diagram, this._item);
            this._availableParents.sort(diagramItemTitleAsc);
        }
        return this._availableParents;
    }

    get currentParentId(): string { return this._currentParent ? this._currentParent.id : ""; }

    get methods(): Method[] { return this._methods };

    get currentMethod(): Method { return this._currentMethod; }

    get okEnable(): boolean {
        return (this._title ?? "").trim().length > 0;
    }

    onParentChange(id: string): void {
        this._currentParent = id == "0" ? null : this._diagramService.diagram.getItemById(id);
    }

    onMethodChange(id: string): void {
        this._currentMethod = this._methods.find(m => m.id == id);
        this._currentMethodIndex = this._methods.indexOf(this._currentMethod);
    }

    upMethod(): void {
        this._methods.splice(this._currentMethodIndex, 1);
        this._currentMethodIndex--;
        this._methods.splice(this._currentMethodIndex, 0, this._currentMethod);
    }

    upMethodEnable(): boolean {
        return this._currentMethodIndex > 0;
    }

    downMethod(): void {
        this._methods.splice(this._currentMethodIndex, 1);
        this._currentMethodIndex++;
        this._methods.splice(this._currentMethodIndex, 0, this._currentMethod);
    }

    downMethodEnable(): boolean {
        return this._currentMethodIndex < this._methods.length - 1;
    }

    addMethod(): void {
        var method = new Method();
        method.signature = "newMethod(): void";
        this._methods.push(method);
    }

    deleteMethod(): void {
        if (this._currentMethod) {
            this._methods = this._methods.filter(m => m.isEquals(this._currentMethod) == false);
            this._currentMethod = null;
        }
    }

    onKeyDown(event: KeyboardEvent): void {
        if (event.code == "Enter" || event.code == "NumpadEnter") {
            this._dialogRef.close(true);
        }
    }

    getResult(): EditDiagramItemResult {
        var logic = new InheritanceLogic();
        var titleNew = this._title.trim();
        var methodsOld = this.item ? this.item.methods : [];
        return {
            item: this._item,
            titleOld: this._item ? this.item.title : "",
            titleNew: titleNew,
            titleHasChanged: this._item ? this._item.title.localeCompare(titleNew) != 0 : true,
            parentOld: logic.getParent(this._diagramService.diagram, this._item),
            parentNew: this._currentParent,
            parentHasChanged: !DiagramItem.isEquals(this._currentParent, this._item),
            methodsOld: methodsOld,
            methodsNew: this._methods,
            methodsHasChanged: !Method.isEqualsMethods(methodsOld, this._methods)
        };
    }
}
