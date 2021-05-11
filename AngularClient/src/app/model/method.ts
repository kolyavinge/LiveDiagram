import Utils from 'src/app/infrastructure/utils';

export class Method {

    private _id: string;
    private _signature: string;

    constructor(id: string = null) {
        this._id = id ?? Utils.generateId();
    }

    get id(): string { return this._id; }

    isEquals(x: Method): boolean {
        if (!x) return false;
        return this._id == x._id;
    }

    static isEqualsMethods(x: Method[], y: Method[]): boolean {
        if (!x && !y) return true;
        if (x && !y) return false;
        if (!x && y) return false;
        if (x.length != y.length) return false;
        for (var i = 0; i < x.length; i++) {
            var xm = x[i];
            var ym = y.find(m => m.isEquals(xm));
            if (!ym) return false;
            var signatureEquals = xm.signature.localeCompare(ym.signature) == 0;
            if (signatureEquals == false) return false;
        }

        return true;
    }

    get signature(): string { return this._signature; }

    set signature(value: string) { this._signature = value; }

    copy(): Method {
        var copyMethod = new Method(this._id);
        copyMethod._signature = this._signature;

        return copyMethod;
    }
}
