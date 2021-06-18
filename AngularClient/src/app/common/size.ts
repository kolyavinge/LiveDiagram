
export class Size {
    private _width: number;
    private _height: number;

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
    }

    get width(): number { return this._width; }

    get height(): number { return this._height; }

    isEquals(other: Size): boolean {
        return this.width === other.width && this.height === other.height;
    }
}
