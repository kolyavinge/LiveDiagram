import { DiagramItem } from "./diagram-item";
import { Segment } from "./segment";
import { SegmentCalculator } from "./segment-calculator";
import { Event } from 'src/app/infrastructure/event';
import Utils from 'src/app/infrastructure/utils';

export class Relation {

    private _id: string;
    private _from: DiagramItem;
    private _to: DiagramItem;
    private _segments: Segment[] = [];
    private _segmentCalculator = new SegmentCalculator();
    private _calculateSegmentsEvent: Event = new Event();

    constructor(id: string = null) {
        this._id = id ?? Utils.generateId();
    }

    setDiagramItems(from: DiagramItem, to: DiagramItem) {
        this._from = from;
        this._to = to;
        this.calculateSegments();
    }

    isEquals(x: Relation): boolean {
        if (x == undefined || x == null) return false;
        return this._id == x._id;
    }

    get id(): string {
        return this._id;
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

    get calculateSegmentsEvent(): Event {
        return this._calculateSegmentsEvent;
    }

    calculateSegments(): void {
        this._segments = this._segmentCalculator.calculateSegments(this._from, this._to);
        this._calculateSegmentsEvent.raise(this._segments);
    }
}
