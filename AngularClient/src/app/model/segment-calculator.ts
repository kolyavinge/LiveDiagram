import { DiagramItem } from "./diagram-item";
import { Segment, SegmentKind } from "./segment";

export class SegmentCalculator {

    private _kind = new SegmentKind();

    calculateSegments(from: DiagramItem, to: DiagramItem): Segment[] {
        var fromY = from.position.y;
        var toY = to.position.y;
        var fromMiddleX = from.position.x + from.size.width / 2;
        var fromBottomY = from.position.y + from.size.height;
        var toMiddleX = to.position.x + to.size.width / 2;
        var toBottomY = to.position.y + to.size.height;
        var toAbove = fromBottomY - toBottomY > 0;
        var toBelow = toY - fromBottomY > 40;
        var toOnLeft = fromMiddleX - toMiddleX > 20;
        var toOnRight = toMiddleX - fromMiddleX > 20;
        var toOnMiddle = !toOnLeft && !toOnRight;

        if (toBelow && toOnMiddle) {
            return [
                new Segment(fromMiddleX - 2, fromBottomY, 5, toY - fromBottomY - 10),
                new Segment(fromMiddleX - 7, toY - 16, 0, 0, this._kind.arrowDown)
            ];
        } else if (toBelow && toOnLeft) {
            return [
                new Segment(fromMiddleX - 2, fromBottomY, 5, 20),
                new Segment(toMiddleX - 2, fromBottomY + 20, fromMiddleX - toMiddleX + 5, 5),
                new Segment(toMiddleX - 2, fromBottomY + 20, 5, toY - fromBottomY - 20 - 10),
                new Segment(toMiddleX - 7, toY - 16, 0, 0, this._kind.arrowDown)
            ];
        } else if (toBelow && toOnRight) {
            return [
                new Segment(fromMiddleX - 2, fromBottomY, 5, 20),
                new Segment(fromMiddleX - 2, fromBottomY + 20, toMiddleX - fromMiddleX, 5),
                new Segment(toMiddleX - 2, fromBottomY + 20, 5, toY - fromBottomY - 20 - 10),
                new Segment(toMiddleX - 7, toY - 16, 0, 0, this._kind.arrowDown)
            ];
        } else if (toAbove && toOnMiddle) {
            return [
                new Segment(toMiddleX - 2, toBottomY + 10, 5, fromY - toBottomY - 10),
                new Segment(toMiddleX - 7, toBottomY - 3, 0, 0, this._kind.arrowUp)
            ];
        } else if (toAbove && toOnLeft) {
            return [
                new Segment(fromMiddleX - 2, fromBottomY, 5, 20),
                new Segment(toMiddleX - 2, fromBottomY + 20, fromMiddleX - toMiddleX + 5, 5),
                new Segment(toMiddleX - 2, toBottomY + 10, 5, fromBottomY - toBottomY + 20 - 10),
                new Segment(toMiddleX - 7, toBottomY - 3, 0, 0, this._kind.arrowUp)
            ];
        } else if (toAbove && toOnRight) {
            return [
                new Segment(fromMiddleX - 2, fromBottomY, 5, 20),
                new Segment(fromMiddleX - 2, fromBottomY + 20, toMiddleX - fromMiddleX + 5, 5),
                new Segment(toMiddleX - 2, toBottomY + 10, 5, fromBottomY - toBottomY + 20 - 10),
                new Segment(toMiddleX - 7, toBottomY - 3, 0, 0, this._kind.arrowUp)
            ];
        } else if (toOnLeft) {
            return [
                new Segment(fromMiddleX - 2, fromBottomY, 5, toBottomY - fromBottomY + 20),
                new Segment(toMiddleX - 2, toBottomY + 20, fromMiddleX - toMiddleX + 5, 5),
                new Segment(toMiddleX - 2, toBottomY + 10, 5, 20 - 10),
                new Segment(toMiddleX - 7, toBottomY - 3, 0, 0, this._kind.arrowUp)
            ];
        } else if (toOnRight) {
            return [
                new Segment(fromMiddleX - 2, fromBottomY, 5, toBottomY - fromBottomY + 20),
                new Segment(fromMiddleX - 2, toBottomY + 20, toMiddleX - fromMiddleX + 5, 5),
                new Segment(toMiddleX - 2, toBottomY + 10, 5, 20 - 10),
                new Segment(toMiddleX - 7, toBottomY - 3, 0, 0, this._kind.arrowUp)
            ];
        } else {
            return [
                new Segment(fromMiddleX - 2, fromBottomY, 5, toY - fromBottomY - 10),
                new Segment(fromMiddleX - 7, toY - 16, 0, 0, this._kind.arrowDown)
            ];
        }
    }
}
