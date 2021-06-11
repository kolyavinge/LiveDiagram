import { Injectable } from '@angular/core';
import Utils from 'src/app/common/utils';

export class AuthData {
    clientId: string = Utils.generateId();
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

    private _authData: AuthData = new AuthData();

    get authData(): AuthData {
        return this._authData;
    }

    set authData(value: AuthData) {
        this._authData = value;
    }
}
