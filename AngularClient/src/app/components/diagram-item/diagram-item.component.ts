import { Component, OnInit, Input } from '@angular/core';
import { ResizeDirection } from 'src/app/model/resize-direction';
import { DiagramItem } from 'src/app/model/diagram-item';
import { CommandService } from 'src/app/services/command.service';
import { Command } from 'src/app/common/command';

@Component({
    selector: 'app-diagram-item',
    templateUrl: './diagram-item.component.html',
    styleUrls: ['./diagram-item.component.css', '../../common.css']
})
export class DiagramItemComponent implements OnInit {

    @Input() item: DiagramItem;
    editDiagramItemCommand: Command;

    private _resize: ResizeDirection = new ResizeDirection();

    constructor(
        private _commandService: CommandService
    ) { }

    ngOnInit(): void {
        this.editDiagramItemCommand = this._commandService.makeEditDiagramItemCommand(this.item);
    }

    get resize(): ResizeDirection { return this._resize; }

    onMouseDown(): void {
        this.item.isPointed = true;
    }

    onResizeMouseDown(resizeDirectionValue: number): void {
        this.item.resizeDirectionValue = resizeDirectionValue;
    }
}
