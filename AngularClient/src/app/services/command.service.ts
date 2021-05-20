import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DiagramEventsService } from './diagram-events.service';
import { DiagramService } from './diagram.service';
import { DeleteDiagramItemCommand } from '../commands/delete-diagram-item-command';
import { DeleteRelationCommand } from '../commands/delete-relation-command';
import { CreateDiagramItemCommand } from '../commands/create-diagram-item-command';
import { LayoutDiagramCommand } from '../commands/layout-diagram-command';

@Injectable({ providedIn: 'root' })
export class CommandService {

    constructor(
        private _diagramEventsService: DiagramEventsService,
        private _diagramService: DiagramService,
        private _dialogService: MatDialog
    ) { }

    makeDeleteDiagramItemCommand(): DeleteDiagramItemCommand {
        return new DeleteDiagramItemCommand(this._dialogService, this._diagramEventsService);
    }

    makeDeleteRelationCommand(): DeleteRelationCommand {
        return new DeleteRelationCommand(this._dialogService, this._diagramEventsService);
    }

    makeCreateDiagramItemCommand(): CreateDiagramItemCommand {
        return new CreateDiagramItemCommand(this._dialogService, this._diagramEventsService);
    }

    makeLayoutDiagramCommand(): LayoutDiagramCommand {
        return new LayoutDiagramCommand();
    }
}
