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

    abstract doInner(): void;

    abstract undoInner(): void;

    abstract getInfo(): ActionInfo;
}

export interface ActionInfo {
    kind: string;
    title: string;
}
