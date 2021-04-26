import { Position } from 'src/app/model/position';
import { Size } from 'src/app/model/size';
import { ResizeDirection } from './resize-direction';

export class DiagramItem {

    minSize: Size = new Size(100, 100);

    id: string;
    title: string;
    position: Position;
    size: Size;
    isPointed: boolean;
    isSelected: boolean;
    resizeDirectionValue: number;
    hasMoved: boolean;
    hasResized: boolean;

    constructor() {
        this.id = "123";
        this.title = "new item";
        this.position = { x: 100, y: 100 };
        this.size = { width: 120, height: 160 };
        this.isPointed = false;
        this.isSelected = false;
        this.resizeDirectionValue = 0;
        this.hasMoved = false;
        this.hasResized = false;
    }

    isEquals(x: DiagramItem): boolean {
        if (x == undefined || x == null) return false;
        return this.id == x.id;
    }
    
    setPosition(x: number, y: number): void {
        this.position.x = x;
        this.position.y = y;
        this.hasMoved = true;
    }

    setSize(width: number, height: number): void {
        this.size.width = width;
        this.size.height = height;
        this.hasResized = true;
    }

    clearPointed(): void {
        this.isPointed = false;
        this.hasMoved = false;
    }

    clearSelected(): void {
        this.isSelected = false;
    }

    clearResize(): void {
        this.resizeDirectionValue = 0;
        this.hasResized = false;
    }
}
