import Utils from 'src/app/infrastructure/utils';
import { Diagram } from '../model/diagram';

export abstract class Action {

    private _id: string;
    private _diagram: Diagram;
    private _isActive: boolean = false;
    private _info: ActionInfo = null;

    constructor(id: string = null, diagram: Diagram) {
        this._id = id ?? Utils.generateId();
        this._diagram = diagram;
    }

    get id(): string { return this._id; }

    get diagram(): Diagram { return this._diagram; }

    get isActive(): boolean { return this._isActive; }

    do(): void {
        if (this._isActive == false) {
            this._isActive = true;
            this.doInner();
        }
    }

    undo(): void {
        if (this._isActive == true) {
            this._isActive = false;
            this.undoInner();
        }
    }

    get info(): ActionInfo {
        if (this._info == null) this._info = this.getInfo();
        return this._info;
    }

    protected abstract doInner(): void;

    protected abstract undoInner(): void;

    protected abstract getInfo(): ActionInfo;
}

export interface ActionInfo {
    kind: string;
    title: string;
}

export class ActionKind {
    static add: string = "добав";
    static edit: string = "измен";
    static delete: string = "удал";
    static move: string = "перемещ";
    static resize: string = "размер";
}
