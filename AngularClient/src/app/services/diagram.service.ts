import { Injectable } from '@angular/core';
import { Diagram } from '../model/diagram';
import { DiagramItem } from '../model/diagram-item';
import { ApiService } from './api.service';
import { DiagramEventsService } from './diagram-events.service';
import { DiagramUpdaterService } from './diagram-updater.service';

@Injectable({ providedIn: 'root' })
export class DiagramService {

    private _diagram: Diagram;

    constructor(
        private _apiService: ApiService,
        private _diagramEventsService: DiagramEventsService,
        private _diagramUpdaterService: DiagramUpdaterService
    ) {
        this._diagram = new Diagram();
        this._diagramUpdaterService.connectToDiagram(this._diagram);
        this.addHandlers();
    }

    get diagram(): Diagram {
        return this._diagram;
    }

    addHandlers(): void {
        var self = this;

        self._diagramEventsService.diagramItemMoveEvent.addHandler((diagramItem: DiagramItem) => {
            self._apiService.diagramItemMove(self._diagram, diagramItem);
        });

        self._diagramEventsService.diagramItemResizeEvent.addHandler((diagramItem: DiagramItem) => {
            self._apiService.diagramItemResize(self._diagram, diagramItem);
        });

        self._diagramEventsService.diagramItemSetTitleEvent.addHandler((diagramItem: DiagramItem) => {
            self._apiService.diagramItemSetTitle(self._diagram, diagramItem);
        });
    }
}
