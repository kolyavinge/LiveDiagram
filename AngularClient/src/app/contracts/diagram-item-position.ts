import { DiagramItem } from '../model/diagram-item';
import { Point } from '../common/geometry';

export interface DiagramItemPosition {
    item: DiagramItem;
    positionOld: Point;
    positionNew: Point;
}
