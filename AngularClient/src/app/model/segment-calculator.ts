import { DiagramItem } from "./diagram-item";
import { Segment } from "./segment";

export class SegmentCalculator {

    calculateSegments(from: DiagramItem, to: DiagramItem): Segment[] {
        var fromY = from.position.y;
        var toY = to.position.y;
        var fromMiddleX = from.position.x + from.size.width / 2;
        var fromBottomY = from.position.y + from.size.height;
        var toMiddleX = to.position.x + to.size.width / 2;
        var toBottomY = to.position.y + to.size.height;
        var toAbove = fromBottomY - toBottomY > 0;
        var toBelow = toY - fromBottomY > 20;
        var toOnLeft = fromMiddleX - toMiddleX > 20;
        var toOnRight = toMiddleX - fromMiddleX > 20;
        var toOnMiddle = !toOnLeft && !toOnRight;

        if (toBelow && toOnMiddle) {
            return [
                new Segment(fromMiddleX - 2, fromBottomY, 5, toY - fromBottomY)
            ];
        } else if (toBelow && toOnLeft) {
            return [
                new Segment(fromMiddleX - 2, fromBottomY, 5, 20),
                new Segment(toMiddleX - 2, fromBottomY + 20, fromMiddleX - toMiddleX + 5, 5),
                new Segment(toMiddleX - 2, fromBottomY + 20, 5, toY - fromBottomY - 20)
            ];
        } else if (toBelow && toOnRight) {
            return [
                new Segment(fromMiddleX - 2, fromBottomY, 5, 20),
                new Segment(fromMiddleX - 2, fromBottomY + 20, toMiddleX - fromMiddleX, 5),
                new Segment(toMiddleX - 2, fromBottomY + 20, 5, toY - fromBottomY - 20)
            ];
        } else if (toAbove && toOnMiddle) {
            return [
                new Segment(toMiddleX - 2, toBottomY, 5, fromY - toBottomY)
            ];
        } else if (toAbove && toOnLeft) {
            return [
                new Segment(fromMiddleX - 2, fromBottomY, 5, 20),
                new Segment(toMiddleX - 2, fromBottomY + 20, fromMiddleX - toMiddleX + 5, 5),
                new Segment(toMiddleX - 2, toBottomY, 5, fromBottomY - toBottomY + 20)
            ];
        } else if (toAbove && toOnRight) {
            return [
                new Segment(fromMiddleX - 2, fromBottomY, 5, 20),
                new Segment(fromMiddleX - 2, fromBottomY + 20, toMiddleX - fromMiddleX + 5, 5),
                new Segment(toMiddleX - 2, toBottomY, 5, fromBottomY - toBottomY + 20)
            ];
        } else if (toOnLeft) {
            return [
                new Segment(fromMiddleX - 2, fromBottomY, 5, toBottomY - fromBottomY + 20),
                new Segment(toMiddleX - 2, toBottomY + 20, fromMiddleX - toMiddleX + 5, 5),
                new Segment(toMiddleX - 2, toBottomY, 5, 20)
            ];
        } else if (toOnRight) {
            return [
                new Segment(fromMiddleX - 2, fromBottomY, 5, toBottomY - fromBottomY + 20),
                new Segment(fromMiddleX - 2, toBottomY + 20, toMiddleX - fromMiddleX + 5, 5),
                new Segment(toMiddleX - 2, toBottomY, 5, 20)
            ];
        } else {
            return [];
        }
    }
}
