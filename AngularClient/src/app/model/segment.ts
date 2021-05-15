import { Point } from "./point";
import { Size } from "./size";

export class Segment {

    private _position: Point;
    private _size: Size;
    private _direction: number;

    constructor(x: number, y: number, width: number, height: number, direction: number) {
        this._position = new Point(x, y);
        this._size = new Size(width, height);
        this._direction = direction;
    }

    get position(): Point {
        return this._position;
    }

    get size(): Size {
        return this._size;
    }

    get direction(): number {
        return this._direction;
    }
}
