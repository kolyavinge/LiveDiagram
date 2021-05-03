import { DiagramItem } from "./diagram-item";
import { Position } from "./position";
import { Segment } from "./segment";
import { Size } from "./size";

export class SegmentCalculator {

    calculateSegments(from: DiagramItem, to: DiagramItem): Segment[] {
        return [
            new Segment(
                new Position(from.position.x + from.size.width / 2 - 3, from.position.y + from.size.height),
                new Size(6, 20)),
            new Segment(
                new Position(from.position.x + from.size.width / 2 - 3, from.position.y + from.size.height + 20),
                new Size(to.position.x - from.position.x, 6)),
            new Segment(
                new Position(from.position.x + from.size.width / 2 - 3 + to.position.x - from.position.x, from.position.y + from.size.height + 20),
                new Size(6, to.position.y - from.position.y - to.size.height - 20)),
        ];
    }
}
