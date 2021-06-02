import { Injectable } from '@angular/core';
import { Event } from 'src/app/infrastructure/event';

@Injectable({ providedIn: 'root' })
export class DiagramEventsService {

    diagramLoadedEvent: Event = new Event();
    diagramSetTitleEvent: Event = new Event();
    diagramItemMoveEvent: Event = new Event();
    diagramItemResizeEvent: Event = new Event();
    diagramItemSetTitleEvent: Event = new Event();
    diagramItemAddEvent: Event = new Event();
    diagramItemDeleteEvent: Event = new Event();
    diagramItemEditEvent: Event = new Event();
    diagramLayoutEvent: Event = new Event();
    relationAddEvent: Event = new Event();
    relationDeleteEvent: Event = new Event();
    diagramItemSetSelectionEvent: Event = new Event();
    relationSetSelectionEvent: Event = new Event();
    diagramClearSelectionEvent: Event = new Event();
}
