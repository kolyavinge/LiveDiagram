import { Command } from '../common/command';
import { DiagramService } from '../services/diagram.service';

export class CreateDiagramCommand extends Command {

    constructor(private _diagramService: DiagramService) {
        super();
    }

    protected execInner(): void {
        this._diagramService.createDiagram();
    }

    get title(): string { return 'Создать диаграмму'; }
}
