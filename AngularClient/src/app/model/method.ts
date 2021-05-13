import { Identifiable } from 'src/app/model/identifiable';

export class Method extends Identifiable {

    private _signature: string;

    constructor(id: string = null) {
        super(id);
    }

    static isEqualsMethods(x: Method[], y: Method[]): boolean {
        if (!x && !y) return true;
        if (x && !y) return false;
        if (!x && y) return false;
        if (x.length != y.length) return false;
        for (var i = 0; i < x.length; i++) {
            var xm = x[i];
            var ym = y[i];
            if (xm.isEquals(ym) == false) return false;
            var signatureEquals = xm.signature.localeCompare(ym.signature) == 0;
            if (signatureEquals == false) return false;
        }

        return true;
    }

    get signature(): string { return this._signature; }

    set signature(value: string) { this._signature = value; }

    copy(): Method {
        var copyMethod = new Method(this.id);
        copyMethod._signature = this._signature;

        return copyMethod;
    }
}
