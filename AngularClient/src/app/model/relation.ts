import { DiagramItem } from "./diagram-item";
import { Segment } from "./segment";
import { SegmentCalculator } from "./segment-calculator";
import Utils from 'src/app/infrastructure/utils';

export class Relation {

    private _id: string;
    private _from: DiagramItem;
    private _to: DiagramItem;
    private _segments: Segment[] = [];

    constructor(id: string = null) {
        this._id = id ?? Utils.generateId();
    }

    setDiagramItems(from: DiagramItem, to: DiagramItem) {
        this._from = from;
        this._to = to;
        this.calculateSegments();
    }

    get from(): DiagramItem {
        return this._from;
    }

    get to(): DiagramItem {
        return this._to;
    }

    get segments(): Segment[] {
        return this._segments;
    }

    calculateSegments(): void {
        var segmentCalculator = new SegmentCalculator();
        this._segments = segmentCalculator.calculateSegments(this._from, this._to);
    }
}
