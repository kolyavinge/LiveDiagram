import { Diagram } from '../model/diagram';
import { DiagramEventsService } from '../services/diagram-events.service';

export class SaveDiagramCommand {

    private _diagramEventsService: DiagramEventsService;

    constructor(diagramEventsService: DiagramEventsService) {
        this._diagramEventsService = diagramEventsService;
    }

    exec(diagram: Diagram): void {
        this._diagramEventsService.saveDiagramEvent.raise(diagram);
    }
}
