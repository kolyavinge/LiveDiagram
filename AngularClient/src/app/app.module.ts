import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularResizedEventModule } from 'angular-resize-event';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { DiagramComponent } from './components/diagram/diagram.component';
import { DiagramItemComponent } from './components/diagram-item/diagram-item.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { EditDiagramItemDialogComponent } from './dialogs/edit-diagram-item-dialog/edit-diagram-item-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        DiagramComponent,
        DiagramItemComponent,
        MainMenuComponent,
        StatusBarComponent,
        EditDiagramItemDialogComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AngularResizedEventModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
