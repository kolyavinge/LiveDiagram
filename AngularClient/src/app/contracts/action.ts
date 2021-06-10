import Utils from 'src/app/infrastructure/utils';
import { Diagram } from '../model/diagram';

export abstract class Action {

    private _id: string;
    private _diagram: Diagram;
    private _isActive: boolean = false;

    constructor(id: string = null, diagram: Diagram) {
        this._id = id ?? Utils.generateId();
        this._diagram = diagram;
    }

    get id(): string { return this._id; }

    get diagram(): Diagram { return this._diagram; }

    get isActive(): boolean { return this._isActive; }

    set isActive(value: boolean) { this._isActive = value; }

    do(): void {
        if (this._isActive == true) return;
        this._isActive = true;
        this.doInner();
    }

    undo(): void {
        if (this._isActive == false) return;
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
