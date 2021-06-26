import { DiagramItem } from '../model/diagram-item';
import { Point } from './geometry';

export interface DiagramItemPosition {
    item: DiagramItem;
    positionOld: Point;
    positionNew: Point;
}
