import { Injectable } from '@angular/core';

export interface AuthData {
    clientId: string;
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

    private _authData: AuthData;

    get authData(): AuthData {
        return this._authData;
    }

    set authData(value: AuthData) {
        this._authData = value;
    }
}
