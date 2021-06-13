import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularResizedEventModule } from 'angular-resize-event';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { DiagramComponent } from './components/diagram/diagram.component';
import { DiagramItemComponent } from './components/diagram-item/diagram-item.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { EditDiagramItemDialogComponent } from './dialogs/edit-diagram-item-dialog/edit-diagram-item-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { RelationComponent } from './components/relation/relation.component';
import { HistoryComponent } from './components/history/history.component';
import { SelectionRectangleComponent } from './components/selection-rectangle/selection-rectangle.component';

@NgModule({
    declarations: [
        AppComponent,
        DiagramComponent,
        DiagramItemComponent,
        MainMenuComponent,
        StatusBarComponent,
        EditDiagramItemDialogComponent,
        ConfirmDialogComponent,
        RelationComponent,
        HistoryComponent,
        SelectionRectangleComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AngularResizedEventModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        MatMenuModule,
        MatTooltipModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
