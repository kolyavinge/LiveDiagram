import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularResizedEventModule } from 'angular-resize-event';

import { AppComponent } from './app.component';
import { DiagramComponent } from './components/diagram/diagram.component';
import { DiagramItemComponent } from './components/diagram-item/diagram-item.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';

@NgModule({
    declarations: [
        AppComponent,
        DiagramComponent,
        DiagramItemComponent,
        MainMenuComponent,
        StatusBarComponent,
    ],
    imports: [
        BrowserModule,
        AngularResizedEventModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
