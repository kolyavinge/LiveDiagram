import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

    private _message: string = "";

    constructor() { }

    ngOnInit(): void { }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }
}
