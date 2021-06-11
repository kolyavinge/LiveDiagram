import { Identifiable } from 'src/app/common/identifiable';
import { DiagramItem } from "./diagram-item";
import { Segment } from "./segment";
import { SegmentCalculator } from "./segment-calculator";
import { Event } from 'src/app/common/event';

const segmentCalculator = new SegmentCalculator();

export class Relation extends Identifiable {

    private _from: DiagramItem;
    private _to: DiagramItem;
    private _segments: Segment[] = [];
    private _isPointed: boolean;
    private _isSelected: boolean;
    private _calculateSegmentsEvent: Event = new Event();

    constructor(id: string = null) {
        super(id);
        this._isPointed = false;
        this._isSelected = false;
    }

    setDiagramItems(from: DiagramItem, to: DiagramItem) {
        this._from = from;
        this._to = to;
        this.calculateSegments();
    }

    get from(): DiagramItem { return this._from; }

    get to(): DiagramItem { return this._to; }

    get segments(): Segment[] { return this._segments; }

    get isPointed(): boolean { return this._isPointed };

    set isPointed(value: boolean) { this._isPointed = value; }

    get isSelected(): boolean { return this._isSelected };

    set isSelected(value: boolean) { this._isSelected = value; }

    get calculateSegmentsEvent(): Event { return this._calculateSegmentsEvent; }

    calculateSegments(): void {
        this._segments = segmentCalculator.calculateSegments(this._from, this._to);
        this._calculateSegmentsEvent.raise(this._segments);
    }

    getState(): RelationState {
        return {
            relation: this,
            id: this.id,
            from: this.from,
            to: this.to,
        }
    }

    setState(state: RelationState): void {
        this.setDiagramItems(state.from, state.to);
    }
}

export interface RelationState {
    relation: Relation,
    id: string,
    from: DiagramItem;
    to: DiagramItem;
}
