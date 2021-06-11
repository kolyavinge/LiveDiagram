import { Identifiable } from 'src/app/common/identifiable';

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
        for (let i = 0; i < x.length; i++) {
            let xm = x[i];
            let ym = y[i];
            if (xm.isEquals(ym) == false) return false;
            let signatureEquals = xm.signature.localeCompare(ym.signature) == 0;
            if (signatureEquals == false) return false;
        }

        return true;
    }

    get signature(): string { return this._signature; }

    set signature(value: string) { this._signature = value; }

    copy(): Method {
        let copyMethod = new Method(this.id);
        copyMethod._signature = this._signature;

        return copyMethod;
    }
}
