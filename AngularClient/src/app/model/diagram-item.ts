import { Position } from 'src/app/model/position';
import { Size } from 'src/app/model/size';
import { Method } from './method';
import Utils from 'src/app/infrastructure/utils';

const minSize: Size = new Size(100, 100);

export class DiagramItem {

    private _id: string;
    private _title: string = "";
    private _position: Position = new Position(0, 0);
    private _size: Size = new Size(0, 0);
    private _isPointed: boolean = false;
    private _isSelected: boolean = false;
    private _resizeDirectionValue: number = 0;
    private _hasMoved: boolean = false;
    private _hasResized: boolean = false;
    private _methods: Method[] = [];

    constructor(id: string = null) {
        this._id = id ?? Utils.generateId();
        this._methods.push(new Method("123"));
        this._methods[0].signature = "equals(x: object): bool";
        this._methods.push(new Method("345"));
        this._methods[1].signature = "getHasCode(): int";
    }

    get minSize(): Size { return minSize; }

    get id(): string { return this._id; }

    get title(): string { return this._title; }

    set title(value: string) { this._title = value; }

    isEquals(x: DiagramItem): boolean {
        if (!x) return false;
        return this._id == x._id;
    }

    static isEquals(x: DiagramItem, y: DiagramItem): boolean {
        if (!x && !y) return true;
        if (x && !y) return false;
        if (!x && y) return false;
        return x.isEquals(y);
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

    get methods(): Method[] { return this._methods; }

    set methods(value: Method[]) { this._methods = value; }

    addMethods(methods: Method[]): void {
        methods.forEach(method => this._methods.push(method));
    }

    deleteMethods(methods: Method[]): void {
        var methodIncludeInDeleted = (method: Method) => methods.find(m => method.isEquals(m)) != null;
        this._methods = this._methods.filter(m => methodIncludeInDeleted(m) == false);
    }
}
