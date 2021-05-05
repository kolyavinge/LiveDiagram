import { Position } from "./position";
import { Size } from "./size";

export class Segment {

    private _position: Position;
    private _size: Size;

    constructor(x: number, y: number, width: number, height: number) {
        this._position = new Position(x, y);
        this._size = new Size(width, height);
    }

    get position(): Position {
        return this._position;
    }

    get size(): Size {
        return this._size;
    }
}
