import { Component, OnInit } from '@angular/core';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { Action } from 'src/app/common/action';
import { ActionService } from 'src/app/services/action.service';

export const tooltipDefaults: MatTooltipDefaultOptions = {
    showDelay: 500,
    hideDelay: 0,
    touchendHideDelay: 0,
};

interface HistoryItem {
    action: Action;
    title: string;
}

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css', '../../common.css'],
    providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: tooltipDefaults }],
})
export class HistoryComponent implements OnInit {

    private _items: HistoryItem[] = [];

    constructor(
        private _actionService: ActionService
    ) {
        let self = this;
        self._actionService.actionsChangedEvent.addHandler(() => {
            self._items = self._actionService.actions.map(a => {
                return {
                    action: a,
                    title: a.info.kind + (a.info.title ? ': ' + a.info.title : '')
                };
            }).reverse();
        });
    }

    ngOnInit(): void { }

    get items(): HistoryItem[] {
        return this._items;
    }

    selectItem(item: HistoryItem): void {
        this._actionService.setActiveAction(item.action);
    }
}
