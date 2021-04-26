import { Injectable } from '@angular/core';
import { Diagram } from '../model/diagram';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class DiagramService {

    diagram: Diagram;
    diagramChangeEventHandlers: any[] = [];

    constructor(
        private localStorage: LocalStorageService
    ) {
        this.diagram = new Diagram();
        this.localStorage.setCurrentDiagram(this.diagram);
    }

    getCurrentDiagram(): Diagram {
        return this.diagram;
    }

    addDiagramChangeEventHandler(handler: any) {
        this.diagramChangeEventHandlers.push(handler);
    }

    raiseDiagramChangeEventHandlers() {
        this.diagramChangeEventHandlers.forEach(handler => handler(this.diagram));
    }
}
