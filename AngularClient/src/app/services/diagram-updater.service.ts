import { Injectable } from '@angular/core';
import { Diagram } from '../model/diagram';
import { Method } from '../model/method';
import { ApiNotifierService } from 'src/app/services/api-notifier.service';
import { ActionService } from './action.service';
import { ActionLoader } from '../common/action-loader';

@Injectable({ providedIn: 'root' })
export class DiagramUpdaterService {

    constructor(
        private _apiNotifierService: ApiNotifierService,
        private _actionService: ActionService
    ) { }

    connectToDiagram(diagram: Diagram): void {
        let self = this;
        let actionLoader = new ActionLoader();

        self._apiNotifierService.clearHandlers();

        self._apiNotifierService.onDiagramSetTitle(response => {
            let action = actionLoader.addDiagramSetTitleAction(diagram, response);
            action.do();
            self._actionService.addAction(action);
        });

        self._apiNotifierService.onDiagramLayout(response => {
            let action = actionLoader.addDiagramLayoutAction(diagram, response);
            action.do();
            self._actionService.addAction(action);
        });

        self._apiNotifierService.onDiagramItemMove(response => {
            let action = actionLoader.addDiagramItemMoveAction(diagram, response);
            action.do();
            self._actionService.addAction(action);
        });

        self._apiNotifierService.onDiagramItemResize(response => {
            let action = actionLoader.addDiagramItemResizeAction(diagram, response);
            action.do();
            self._actionService.addAction(action);
        });

        self._apiNotifierService.onDiagramItemSetTitle(response => {
            let action = actionLoader.addDiagramItemSetTitleAction(diagram, response);
            action.do();
            self._actionService.addAction(action);
        });

        self._apiNotifierService.onDiagramItemAdd(response => {
            let action = actionLoader.addDiagramItemAddAction(diagram, response);
            action.do();
            self._actionService.addAction(action);
        });

        self._apiNotifierService.onDiagramItemEdit(response => {
            let action = actionLoader.addDiagramItemEditAction(diagram, response);
            action.do();
            self._actionService.addAction(action);
        });

        self._apiNotifierService.onDiagramItemDelete(response => {
            let action = actionLoader.addDiagramItemDeleteAction(diagram, response);
            action.do();
            self._actionService.addAction(action);
        });

        self._apiNotifierService.onDiagramItemSetMethods(response => {
            let item = diagram.getItemById(response.itemId);
            item.methods = response.methods.map(m => {
                let method = new Method(m.id);
                method.signature = m.signature;
                return method;
            });
        });

        self._apiNotifierService.onRelationAdd(response => {
            let action = actionLoader.addRelationAddAction(diagram, response);
            action.do();
            self._actionService.addAction(action);
        });

        self._apiNotifierService.onRelationEdit(response => {
            let action = actionLoader.addRelationEditAction(diagram, response);
            action.do();
            self._actionService.addAction(action);
        });

        self._apiNotifierService.onRelationDelete(response => {
            let action = actionLoader.addRelationDeleteAction(diagram, response);
            action.do();
            self._actionService.addAction(action);
        });

        self._apiNotifierService.onActionSetActive(response => {
            let action = self._actionService.getActionById(response.actionId);
            self._actionService.updateActiveAction(action);
        });

        self._apiNotifierService.connectToDiagram(diagram.id);
    }
}
