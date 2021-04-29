import { Component } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'Live diagram';

    constructor(
        private _localStorage: LocalStorageService
    ) {
        var authData = { clientId: Date.now().toString() };
        _localStorage.authData = authData;
    }
}
