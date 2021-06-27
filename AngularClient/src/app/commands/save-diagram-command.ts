import { Command } from '../common/command';
import { DiagramEventsService } from '../services/diagram-events.service';
import { DiagramService } from '../services/diagram.service';

export class SaveDiagramCommand extends Command {

    constructor(
        private _diagramService: DiagramService,
        private _diagramEventsService: DiagramEventsService) {
        super();
    }

    protected execInner(): void {
        this._diagramEventsService.saveDiagramEvent.raise(this._diagramService.diagram);
    }

    get title(): string { return 'Сохранить диаграмму'; }
}
