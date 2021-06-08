import { Component, OnInit } from '@angular/core';
import { Action } from 'src/app/contracts/action';
import { ActionService } from 'src/app/services/action.service';

interface HistoryItem {
    action: Action;
    title: string;
}

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css', '../../common.css']
})
export class HistoryComponent implements OnInit {

    constructor(
        private _actionService: ActionService
    ) { }

    ngOnInit(): void { }

    get items(): HistoryItem[] {
        return this._actionService.actions.map(a => {
            return {
                action: a,
                title: a.info.kind + (a.info.title ? ": " + a.info.title : "")
            }
        }).reverse();
    }

    selectItem(item: HistoryItem): void {
        this._actionService.setActiveAction(item.action);
    }
}
