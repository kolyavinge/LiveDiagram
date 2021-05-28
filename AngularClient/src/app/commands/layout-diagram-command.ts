import { Diagram } from "../model/diagram";
import { DiagramEventsService } from "../services/diagram-events.service";

export class LayoutDiagramCommand {

    private _diagramEventsService: DiagramEventsService;

    constructor(diagramEventsService: DiagramEventsService) {
        this._diagramEventsService = diagramEventsService;
    }

    exec(diagram: Diagram): void {
        this._diagramEventsService.diagramLayoutEvent.raise(diagram);
    }
}
