import { Point } from "../common/point";
import { Size } from "../common/size";

export class Segment {

    private _position: Point;
    private _size: Size;
    private _direction: number;

    constructor(x: number, y: number, width: number, height: number, direction: number) {
        this._position = new Point(x, y);
        this._size = new Size(width, height);
        this._direction = direction;
    }

    get position(): Point { return this._position; }

    set position(value: Point) { this._position = value; }

    get size(): Size { return this._size; }

    set size(value: Size) { this._size = value; }

    get direction(): number { return this._direction; }
}
