
export class Size {
    private _width: number;
    private _height: number;

    constructor(width: number = 0, height: number = 0) {
        this._width = width;
        this._height = height;
    }

    get width(): number { return this._width; }
    set width(value: number) { this._width = value; }

    get height(): number { return this._height; }
    set height(value: number) { this._height = value; }

    copy(): Size {
        return new Size(this._width, this._height);
    }
}
