import { Component } from '@angular/core';
import { KeyboardService } from './services/keyboard.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'Live diagram';

    constructor(
        private _keyboardService: KeyboardService
    ) { }

    onKeyDown(event: KeyboardEvent) {
        this._keyboardService.onKeyDown(event);
    }
}
