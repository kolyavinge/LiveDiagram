import { DiagramItemBase } from 'src/app/model/diagram-item-base';
import { Method } from 'src/app/model/method';
import { Point } from './point';
import { Size } from './size';

export class DiagramItem extends DiagramItemBase {

    private _methods: Method[] = [];

    constructor(id: string = null) {
        super(id);
        this._methods.push(new Method("123"));
        this._methods[0].signature = "equals(x: object): bool";
        this._methods.push(new Method("345"));
        this._methods[1].signature = "getHasCode(): int";
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
}

export interface UpdatedDiagramItem {
    id: string;
    position?: Point;
    size?: Size;
}
