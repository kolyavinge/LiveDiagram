import { Identifiable } from './identifiable';
import { Diagram } from '../model/diagram';

export abstract class Action extends Identifiable {

    private _diagram: Diagram;
    private _isActive: boolean = false;

    constructor(id: string = null, diagram: Diagram) {
        super(id);
        this._diagram = diagram;
    }

    get diagram(): Diagram { return this._diagram; }

    get isActive(): boolean { return this._isActive; }

    set isActive(value: boolean) { this._isActive = value; }

    do(): void {
        this._isActive = true;
        this.doInner();
    }

    undo(): void {
        this._isActive = false;
        this.undoInner();
    }

    abstract get info(): ActionInfo;

    protected abstract doInner(): void;

    protected abstract undoInner(): void;
}

export interface ActionInfo {
    kind: string;
    title: string;
}

export class ActionKind {
    static load: string = "загруженная диаграмма";
    static layout: string = "выравнивание";
    static add: string = "добав";
    static edit: string = "измен";
    static delete: string = "удал";
    static move: string = "перемещ";
    static resize: string = "размер";
}
