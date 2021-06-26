import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DiagramEventsService } from './diagram-events.service';
import { DiagramService } from './diagram.service';
import { SaveDiagramCommand } from '../commands/save-diagram-command';
import { LayoutDiagramCommand } from '../commands/layout-diagram-command';
import { CreateDiagramItemCommand } from '../commands/create-diagram-item-command';
import { EditDiagramItemCommand } from '../commands/edit-diagram-item-command';
import { DeleteDiagramItemCommand } from '../commands/delete-diagram-item-command';
import { DeleteRelationCommand } from '../commands/delete-relation-command';

@Injectable({ providedIn: 'root' })
export class CommandService {

    constructor(
        private _diagramEventsService: DiagramEventsService,
        private _diagramService: DiagramService,
        private _dialogService: MatDialog
    ) { }

    makeSaveDiagramCommand(): SaveDiagramCommand {
        return new SaveDiagramCommand(this._diagramEventsService);
    }

    makeLayoutDiagramCommand(): LayoutDiagramCommand {
        return new LayoutDiagramCommand(this._diagramEventsService);
    }

    makeCreateDiagramItemCommand(): CreateDiagramItemCommand {
        return new CreateDiagramItemCommand(this._dialogService, this._diagramEventsService);
    }

    makeEditDiagramItemCommand(): EditDiagramItemCommand {
        return new EditDiagramItemCommand(this._dialogService, this._diagramEventsService);
    }

    makeDeleteDiagramItemCommand(): DeleteDiagramItemCommand {
        return new DeleteDiagramItemCommand(this._dialogService, this._diagramEventsService);
    }

    makeDeleteRelationCommand(): DeleteRelationCommand {
        return new DeleteRelationCommand(this._dialogService, this._diagramEventsService);
    }
}
