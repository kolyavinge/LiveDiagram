import { Direction } from 'src/app/model/direction';
import { DiagramItem } from './diagram-item';
import { Segment } from './segment';

export class SegmentCalculator {

    private _direction: Direction = new Direction();

    calculateSegments(from: DiagramItem, to: DiagramItem): Segment[] {
        let fromY = from.position.y;
        let toY = to.position.y;
        let fromMiddleX = from.position.x + from.size.width / 2;
        let fromBottomY = from.position.y + from.size.height;
        let toMiddleX = to.position.x + to.size.width / 2;
        let toBottomY = to.position.y + to.size.height;
        let toAbove = fromBottomY - toBottomY > 0;
        let toBelow = toY - fromBottomY > 40;
        let toOnLeft = fromMiddleX - toMiddleX > 20;
        let toOnRight = toMiddleX - fromMiddleX > 20;
        let toOnMiddle = !toOnLeft && !toOnRight;

        if (toBelow && toOnMiddle) {
            return [
                new Segment(fromMiddleX, fromBottomY, 1, toY - fromBottomY, this._direction.down)
            ];
        } else if (toBelow && toOnLeft) {
            return [
                new Segment(fromMiddleX, fromBottomY, 1, 20, this._direction.down),
                new Segment(toMiddleX, fromBottomY + 20, fromMiddleX - toMiddleX, 1, this._direction.left),
                new Segment(toMiddleX, fromBottomY + 20, 1, toY - fromBottomY - 20, this._direction.down)
            ];
        } else if (toBelow && toOnRight) {
            return [
                new Segment(fromMiddleX, fromBottomY, 1, 20, this._direction.down),
                new Segment(fromMiddleX, fromBottomY + 20, toMiddleX - fromMiddleX, 1, this._direction.right),
                new Segment(toMiddleX, fromBottomY + 20, 1, toY - fromBottomY - 20, this._direction.down)
            ];
        } else if (toAbove && toOnMiddle) {
            return [
                new Segment(toMiddleX, toBottomY, 1, fromY - toBottomY, this._direction.up)
            ];
        } else if (toAbove && toOnLeft) {
            return [
                new Segment(fromMiddleX, fromBottomY, 1, 20, this._direction.down),
                new Segment(toMiddleX, fromBottomY + 20, fromMiddleX - toMiddleX, 1, this._direction.left),
                new Segment(toMiddleX, toBottomY, 1, fromBottomY - toBottomY + 20, this._direction.up)
            ];
        } else if (toAbove && toOnRight) {
            return [
                new Segment(fromMiddleX, fromBottomY, 1, 20, this._direction.down),
                new Segment(fromMiddleX, fromBottomY + 20, toMiddleX - fromMiddleX, 1, this._direction.right),
                new Segment(toMiddleX, toBottomY, 1, fromBottomY - toBottomY + 20, this._direction.up)
            ];
        } else if (toOnLeft) {
            return [
                new Segment(fromMiddleX, fromBottomY, 1, toBottomY - fromBottomY + 20, this._direction.down),
                new Segment(toMiddleX, toBottomY + 20, fromMiddleX - toMiddleX, 1, this._direction.left),
                new Segment(toMiddleX, toBottomY, 1, 20, this._direction.up)
            ];
        } else if (toOnRight) {
            return [
                new Segment(fromMiddleX, fromBottomY, 1, toBottomY - fromBottomY + 20, this._direction.down),
                new Segment(fromMiddleX, toBottomY + 20, toMiddleX - fromMiddleX, 1, this._direction.right),
                new Segment(toMiddleX, toBottomY, 1, 20, this._direction.up)
            ];
        } else {
            return [
                new Segment(fromMiddleX, fromBottomY, 1, toY - fromBottomY, this._direction.down)
            ];
        }
    }
}
