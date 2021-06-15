import { Identifiable } from 'src/app/common/identifiable';
import { Point } from 'src/app/common/point';
import { Size } from 'src/app/common/size';

const minSize: Size = new Size(100, 100);

export abstract class DiagramItemBase extends Identifiable {

    protected _title: string = "";
    protected _position: Point = new Point(0, 0);
    protected _size: Size = new Size(0, 0);
    protected _isPointed: boolean = false;
    protected _isSelected: boolean = false;
    protected _resizeDirectionValue: number = 0;

    constructor(id: string = null) {
        super(id);
    }

    get minSize(): Size { return minSize; }

    get title(): string { return this._title; }

    set title(value: string) { this._title = value; }

    get position(): Point { return this._position; }

    set position(value: Point) { this._position = value; }

    get size(): Size { return this._size; }

    set size(value: Size) { this._size = value; }

    get isPointed(): boolean { return this._isPointed; }

    set isPointed(value: boolean) { this._isPointed = value; }

    get isSelected(): boolean { return this._isSelected };

    set isSelected(value: boolean) { this._isSelected = value; }

    get resizeDirectionValue(): number { return this._resizeDirectionValue; }

    set resizeDirectionValue(value: number) { this._resizeDirectionValue = value; }

    clearResize(): void {
        this._resizeDirectionValue = 0;
    }
}
