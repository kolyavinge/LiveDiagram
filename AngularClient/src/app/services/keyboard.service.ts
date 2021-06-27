import { Injectable } from '@angular/core';
import { Command } from '../common/command';
import { CommandService } from './command.service';

@Injectable({ providedIn: 'root' })
export class KeyboardService {

    private _createDiagramItemCommand: Command;
    private _deleteCommand: Command;
    private _isControlPressed: boolean = false;

    constructor(
        commandService: CommandService
    ) {
        this._createDiagramItemCommand = commandService.makeCreateDiagramItemCommand();
        this._deleteCommand = commandService.makeDeleteDiagramItemRelationCommand();
    }

    onKeyDown(event: KeyboardEvent): void {
        // console.log(event.code);
        if (event.code === 'Delete') {
            this._deleteCommand.exec();
        } else if (event.code === 'NumpadAdd') {
            this._createDiagramItemCommand.exec();
        } else if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
            this._isControlPressed = true;
        }
    }

    onKeyUp(event: KeyboardEvent): void {
        if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
            this._isControlPressed = false;
        }
    }

    isControlPressed(): boolean {
        return this._isControlPressed;
    }
}
