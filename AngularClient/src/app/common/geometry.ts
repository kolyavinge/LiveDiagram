export class Point {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get x(): number { return this._x; }

    get y(): number { return this._y; }

    isEquals(other: Point): boolean {
        return this.x === other.x && this.y === other.y;
    }
}

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

export class Geometry {

    static pointInRectangle(x, y, rectX, rectY, rectWidth, rectHeight): boolean {
        return rectX <= x && x <= rectX + rectWidth &&
            rectY <= y && y <= rectY + rectHeight;
    }

    static lineCrossed(horizontX, horizontY, width, verticalX, verticalY, height): boolean {
        return horizontX <= verticalX && verticalX <= horizontX + width &&
            verticalY <= horizontY && horizontY <= verticalY + height;
    }
}
