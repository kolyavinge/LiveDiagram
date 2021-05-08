import { Position } from "./position";
import { Size } from "./size";

export class Segment {

    private _position: Position;
    private _size: Size;
    private _direction: number;

    constructor(x: number, y: number, width: number, height: number, direction: number) {
        this._position = new Position(x, y);
        this._size = new Size(width, height);
        this._direction = direction;
    }

    get position(): Position {
        return this._position;
    }

    get size(): Size {
        return this._size;
    }

    get direction(): number {
        return this._direction;
    }
}
