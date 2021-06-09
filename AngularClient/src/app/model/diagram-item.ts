import { DiagramItemBase } from 'src/app/model/diagram-item-base';
import { Method } from 'src/app/model/method';
import { Point } from './point';
import { Size } from './size';

export class DiagramItem extends DiagramItemBase {

    private _methods: Method[] = [];

    constructor(id: string = null) {
        super(id);
    }

    static isEquals(x: DiagramItem, y: DiagramItem): boolean {
        if (!x && !y) return true;
        if (x && !y) return false;
        if (!x && y) return false;
        return x.isEquals(y);
    }

    get methods(): Method[] { return this._methods; }

    set methods(value: Method[]) { this._methods = value; }

    addMethods(methods: Method[]): void {
        methods.forEach(method => this._methods.push(method));
    }

    deleteMethods(methods: Method[]): void {
        var methodIncludeInDeleted = (method: Method) => methods.find(m => method.isEquals(m)) != null;
        this._methods = this._methods.filter(m => methodIncludeInDeleted(m) == false);
    }

    getState(): DiagramItemState {
        return {
            item: this,
            id: this.id,
            position: this.position,
            size: this.size
        };
    }

    copy(): DiagramItem {
        var x = new DiagramItem(this.id);
        x._title = this._title;
        x._position = new Point(this.position.x, this.position.y);
        x._size = new Size(this.size.width, this.size.height);
        x._isPointed = this._isPointed;
        x._isSelected = this._isSelected;
        x._resizeDirectionValue = this._resizeDirectionValue;
        x._methods = this._methods.map(m => m.copy());

        return x;
    }
}

export interface DiagramItemState {
    item?: DiagramItem,
    id?: string;
    position?: Point;
    size?: Size;
}
