import { Command } from '../common/command';
import { DiagramEventsService } from '../services/diagram-events.service';
import { DiagramService } from '../services/diagram.service';

export class LayoutDiagramCommand extends Command {

    constructor(
        private _diagramService: DiagramService,
        private _diagramEventsService: DiagramEventsService) {
        super();
    }

    protected execInner(): void {
        this._diagramEventsService.diagramLayoutEvent.raise(this._diagramService.diagram);
    }

    get title(): string { return 'Выровнять диаграмму'; }
}
