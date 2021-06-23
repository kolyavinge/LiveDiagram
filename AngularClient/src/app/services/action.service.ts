import { Injectable } from '@angular/core';
import { Event } from '../infrastructure/event';
import { Diagram } from '../model/diagram';
import { ActionFactory } from '../common/action-factory';
import { Action } from '../common/action';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ActionService {

    private _actionFactory = new ActionFactory();
    private _loadAction: Action = null;
    private _lastAction: Action = null;
    private _actions: Action[] = [];
    actionsChangedEvent: Event = new Event();

    constructor(
        private _apiService: ApiService
    ) { }

    get actions(): Action[] {
        if (this._loadAction == null) return [];
        return [this._loadAction].concat(this._actions);
    }

    loadDiagram(diagram: Diagram): void {
        this._loadAction = this._actionFactory.makeDiagramLoadAction(diagram);
        this._actions = [];
        this.actionsChangedEvent.raise();
    }

    getActionById(id: string): Action {
        if (this._loadAction.id === id) return this._loadAction;
        return this._actions.find(a => a.id === id);
    }

    addAction(action: Action): void {
        this._actions = this._actions.filter(a => a.isActive).concat(action);
        this._lastAction = null;
        this.actionsChangedEvent.raise();
    }

    setActiveAction(action: Action): void {
        this.updateActiveAction(action);
        this._apiService.actionSetActive(action);
    }

    updateActiveAction(action: Action): void {
        if (action === this._loadAction && this._loadAction !== this._lastAction) {
            action.do();
            this._actions.forEach(a => a.isActive = false);
        } else {
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
        this._lastAction = action;
        this.actionsChangedEvent.raise();
    }
}
