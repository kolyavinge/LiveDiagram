import { DiagramItem } from "../model/diagram-item";

export interface EditDiagramItemResult {

    item: DiagramItem;

    titleOld: string;
    titleNew: string;
    titleHasChanged: boolean;

    parentOld: DiagramItem;
    parentNew: DiagramItem;
    parentHasChanged: boolean;
}
