import { Position } from 'src/app/model/position';
import { Size } from 'src/app/model/size';

const minSize: Size = new Size(100, 100);

export class DiagramItem {

    private _id: string;
    private _title: string;
    private _position: Position;
    private _size: Size;
    private _isPointed: boolean;
    private _isSelected: boolean;
    private _resizeDirectionValue: number;
    private _hasMoved: boolean;
    private _hasResized: boolean;

    constructor() {
        this._id = "123";
        this._title = "new item";
        this._position = new Position(100, 100);
        this._size = new Size(120, 160);
        this._isPointed = false;
        this._isSelected = false;
        this._resizeDirectionValue = 0;
        this._hasMoved = false;
        this._hasResized = false;
    }

    get minSize(): Size { return minSize; }

    get id(): string { return this._id; }

    get title(): string { return this._title; }

    set title(value: string) { this._title = value; }

    isEquals(x: DiagramItem): boolean {
        if (x == undefined || x == null) return false;
        return this._id == x._id;
    }

    get position(): Position { return this._position; }

    setPosition(x: number, y: number): void {
        this._position.x = x;
        this._position.y = y;
        this._hasMoved = true;
    }

    get size(): Size { return this._size; }

    setSize(width: number, height: number): void {
        this._size.width = width;
        this._size.height = height;
        this._hasResized = true;
    }

    get isPointed(): boolean { return this._isPointed; }

    set isPointed(value: boolean) {
        this._isPointed = value;
        if (!value) this._hasMoved = false;
    }

    get hasMoved(): boolean { return this._hasMoved; }

    get isSelected(): boolean { return this._isSelected };

    set isSelected(value: boolean) { this._isSelected = value; }

    get resizeDirectionValue(): number { return this._resizeDirectionValue; }

    set resizeDirectionValue(value: number) { this._resizeDirectionValue = value; }

    clearResize(): void {
        this._resizeDirectionValue = 0;
        this._hasResized = false;
    }

    get hasResized(): boolean { return this._hasResized; }
}
