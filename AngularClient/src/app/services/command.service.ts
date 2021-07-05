import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DiagramItem } from '../model/diagram-item';
import { DiagramEventsService } from './diagram-events.service';
import { DiagramService } from './diagram.service';
import { EditRelationCommand } from '../commands/edit-relation-command';
import { SelectDiagramCommand } from '../commands/select-diagram-command';
import { CreateDiagramItemCommand } from '../commands/create-diagram-item-command';
import { DeleteDiagramItemRelationCommand } from '../commands/delete-diagram-item-relation-command';
import { EditDiagramItemCommand } from '../commands/edit-diagram-item-command';
import { LayoutDiagramCommand } from '../commands/layout-diagram-command';
import { CreateDiagramCommand } from '../commands/create-diagram-command';
import { SaveDiagramCommand } from '../commands/save-diagram-command';

@Injectable({ providedIn: 'root' })
export class CommandService {

    constructor(
        private _diagramEventsService: DiagramEventsService,
        private _diagramService: DiagramService,
        private _dialogService: MatDialog
    ) { }

    makeSelectDiagramCommand(): SelectDiagramCommand {
        return new SelectDiagramCommand(this._dialogService, this._diagramService);
    }

    makeCreateDiagramCommand(): CreateDiagramCommand {
        return new CreateDiagramCommand(this._diagramService);
    }

    makeSaveDiagramCommand(): SaveDiagramCommand {
        return new SaveDiagramCommand(this._diagramService, this._diagramEventsService);
    }

    makeLayoutDiagramCommand(): LayoutDiagramCommand {
        return new LayoutDiagramCommand(this._diagramService, this._diagramEventsService);
    }

    makeCreateDiagramItemCommand(): CreateDiagramItemCommand {
        return new CreateDiagramItemCommand(this._dialogService, this._diagramEventsService);
    }

    makeAddRelationCommand(): EditRelationCommand {
        return new EditRelationCommand(this._diagramService, this._diagramEventsService);
    }

    makeEditDiagramItemCommand(item: DiagramItem): EditDiagramItemCommand {
        return new EditDiagramItemCommand(this._dialogService, this._diagramEventsService, item);
    }

    makeDeleteDiagramItemRelationCommand(): DeleteDiagramItemRelationCommand {
        return new DeleteDiagramItemRelationCommand(this._dialogService, this._diagramService, this._diagramEventsService);
    }
}
