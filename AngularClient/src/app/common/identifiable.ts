import Utils from 'src/app/common/utils';

export abstract class Identifiable {

    private _id: string;

    constructor(id: string) {
        this._id = id ?? Utils.generateId();
    }

    get id(): string { return this._id; }

    isEquals(x: Identifiable): boolean {
        if (!x) return false;
        return this.id === x.id;
    }
}
