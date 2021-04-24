import { Position } from 'src/app/model/position';
import { Size } from 'src/app/model/size';

export class DiagramItem {

    title: string;
    position: Position;
    size: Size;
    isPointed: boolean;

    constructor() {
        var self = this;
        self.title = "new item";
        self.position = { x: 100, y: 100 };
        self.size = { width: 120, height: 160 };
        self.isPointed = false;
    }
}
