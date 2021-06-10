import { Injectable } from '@angular/core';
import { Action } from '../contracts/action';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ActionService {

    private _actions: Action[] = [];

    constructor(
        private _apiService: ApiService
    ) { }

    get actions(): Action[] { return this._actions; }

    getActionById(id: string): Action {
        return this._actions.find(a => a.id == id);
    }

    addAction(action: Action): void {
        this._actions = this._actions.filter(a => a.isActive).concat(action);
    }

    setActiveAction(action: Action): void {
        this.updateActiveAction(action);
        this._apiService.actionSetActive(action);
    }

    updateActiveAction(action: Action): void {
        let index = this._actions.indexOf(action);
        let actionsForDo = this._actions.slice(0, index + 1);
        if (actionsForDo.length > 0) {
            actionsForDo.filter(a => !a.isActive).forEach(a => a.do());
        }
        let actionsForUndo = this._actions.slice(index + 1);
        if (actionsForUndo.length > 0) {
            actionsForUndo.reverse().filter(a => a.isActive).forEach(a => a.undo());
        }
    }

    clearActions(): void {
        this._actions = [];
    }
}
