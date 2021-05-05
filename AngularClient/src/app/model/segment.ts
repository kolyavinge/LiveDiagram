import { Position } from "./position";
import { Size } from "./size";

export class SegmentKind {
    line: number = 1;
    arrowUp: number = 10;
    arrowDown: number = 20;
}

export class Segment {

    private _position: Position;
    private _size: Size;
    private _kind: number;

    constructor(x: number, y: number, width: number, height: number, kind: number = 1) {
        this._position = new Position(x, y);
        this._size = new Size(width, height);
        this._kind = kind;
    }

    get position(): Position {
        return this._position;
    }

    get size(): Size {
        return this._size;
    }

    get kind(): number {
        return this._kind;
    }
}
