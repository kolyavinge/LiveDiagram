import { DiagramItem } from '../model/diagram-item';
import { Method } from '../model/method';

export interface EditDiagramItemResult {

    item: DiagramItem;

    titleOld: string;
    titleNew: string;
    titleHasChanged: boolean;

    parentOld: DiagramItem;
    parentNew: DiagramItem;
    parentHasChanged: boolean;

    methodsOld: Method[];
    methodsNew: Method[];
    methodsHasChanged: boolean;
}
