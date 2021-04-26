import { Injectable } from '@angular/core';

export interface AuthData {
    clientId: string;
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

    authData: AuthData;

    public getAuthData(): AuthData {
        return this.authData;
    }

    public setAuthData(authData: AuthData): void {
        this.authData = authData;
    }
}
