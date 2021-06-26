import { DiagramItem } from '../model/diagram-item';
import { Point, Size } from '../common/geometry';

export interface DiagramItemResizePosition {
    item: DiagramItem;

    positionOld: Point;
    positionNew: Point;

    sizeOld: Size;
    sizeNew: Size;
}
