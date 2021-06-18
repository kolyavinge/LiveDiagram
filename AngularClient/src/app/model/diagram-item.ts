import { Point } from '../common/point';
import { Size } from '../common/size';
import { DiagramItemBase } from 'src/app/model/diagram-item-base';
import { Method } from 'src/app/model/method';

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
        let methodIncludeInDeleted = (method: Method) => methods.find(m => method.isEquals(m)) != null;
        this._methods = this._methods.filter(m => methodIncludeInDeleted(m) === false);
    }

    getState(args: GetDiagramItemStateArgs = null): DiagramItemState {
        args = args ?? { title: true, position: true, size: true, methods: true };
        return {
            item: this,
            id: this.id,
            title: args.title ? this._title : null,
            position: args.position ? this.position : null,
            size: args.size ? this.size : null,
            methods: args.methods ? this.methods.map(m => m.copy()) : null
        };
    }

    setState(state: DiagramItemState): void {
        if (state.title) this.title = state.title;
        if (state.position) this.position = state.position;
        if (state.size) this.size = state.size;
        if (state.methods) this.methods = state.methods;
    }
}

export interface GetDiagramItemStateArgs {
    title?: boolean;
    position?: boolean;
    size?: boolean;
    methods?: boolean;
}

export interface DiagramItemState {
    item?: DiagramItem;
    id?: string;
    title?: string;
    position?: Point;
    size?: Size;
    methods?: Method[];
}
