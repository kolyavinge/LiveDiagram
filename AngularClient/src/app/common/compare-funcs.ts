import { DiagramItem } from "../model/diagram-item";

export function diagramItemTitleAsc(x: DiagramItem, y: DiagramItem): number {
    return x.title.localeCompare(y.title);
}
