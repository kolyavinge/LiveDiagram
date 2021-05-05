import { DiagramItem } from "./diagram-item";
import { Segment } from "./segment";

export class SegmentCalculator {

    calculateSegments(from: DiagramItem, to: DiagramItem): Segment[] {
        var toY = to.position.y;
        var fromMiddleX = from.position.x + from.size.width / 2;
        var fromBottomY = from.position.y + from.size.height;
        var toMiddleX = to.position.x + to.size.width / 2;
        var result = [];
        if (fromMiddleX < toMiddleX) {
            result = [
                new Segment(
                    fromMiddleX - 2, fromBottomY,
                    5, 20),
                new Segment(
                    fromMiddleX - 2, fromBottomY + 20,
                    toMiddleX - fromMiddleX, 5),
                new Segment(
                    toMiddleX - 2, fromBottomY + 20,
                    5, toY - fromBottomY - 20),
            ];
        } else {
            result = [
                new Segment(
                    fromMiddleX - 2, fromBottomY,
                    5, 20),
                new Segment(
                    toMiddleX - 2, fromBottomY + 20,
                    fromMiddleX - toMiddleX + 5, 5),
                new Segment(
                    toMiddleX - 2, fromBottomY + 20,
                    5, toY - fromBottomY - 20),
            ];
        }

        return result;
    }
}
