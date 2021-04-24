import { Position } from 'src/app/model/position';
import { Size } from 'src/app/model/size';
import { ResizeDirection } from './resize-direction';

export class DiagramItem {

    minSize: Size = new Size(100, 100);

    title: string;
    position: Position;
    size: Size;
    isPointed: boolean;
    resizeDirectionValue: number;

    constructor() {
        var self = this;
        self.title = "new item";
        self.position = { x: 100, y: 100 };
        self.size = { width: 120, height: 160 };
        self.isPointed = false;
        self.resizeDirectionValue = 0;
    }

    clearResize(): void {
        this.resizeDirectionValue = 0;
    }
}
