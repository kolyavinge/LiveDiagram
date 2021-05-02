import { Injectable } from '@angular/core';
import { Event } from 'src/app/infrastructure/event';

@Injectable({ providedIn: 'root' })
export class DiagramEventsService {

    diagramItemMoveEvent: Event = new Event();
    diagramItemResizeEvent: Event = new Event();
    diagramItemSetTitleEvent: Event = new Event();
    diagramItemAddEvent: Event = new Event();
    diagramItemDeleteEvent: Event = new Event();
}
