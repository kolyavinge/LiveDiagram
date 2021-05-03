import { Position } from "./position";
import { Size } from "./size";

export class Segment {

    private _position: Position;
    private _size: Size;

    constructor(position: Position, size: Size) {
        this._position = position;
        this._size = size;
    }

    get position(): Position {
        return this._position;
    }

    get size(): Size {
        return this._size;
    }
}
