import { Injectable } from '@angular/core';
import { Diagram } from '../model/diagram';

export interface AuthData {
    clientId: string;
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

    authData: AuthData;
    diagram: Diagram;

    public getAuthData(): AuthData {
        return this.authData;
    }

    public setAuthData(authData: AuthData): void {
        this.authData = authData;
    }

    public getCurrentDiagram(): Diagram {
        return this.diagram;
    }

    public setCurrentDiagram(diagram: Diagram) {
        this.diagram = diagram;
    }
}
