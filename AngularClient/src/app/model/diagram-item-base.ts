import { Identifiable } from 'src/app/model/identifiable';
import { Point } from 'src/app/model/point';
import { Size } from 'src/app/model/size';

const minSize: Size = new Size(100, 100);

export abstract class DiagramItemBase extends Identifiable {

    private _title: string = "";
    private _position: Point = new Point(0, 0);
    private _size: Size = new Size(0, 0);
    private _isPointed: boolean = false;
    private _isSelected: boolean = false;
    private _resizeDirectionValue: number = 0;
    private _hasMoved: boolean = false;
    private _hasResized: boolean = false;

    constructor(id: string = null) {
        super(id);
    }

    get minSize(): Size { return minSize; }

    get title(): string { return this._title; }

    set title(value: string) { this._title = value; }

    get position(): Point { return this._position; }

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
