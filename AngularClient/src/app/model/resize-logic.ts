import { DiagramItem } from "./diagram-item";
import { ResizeDirection } from "./resize-direction";

export interface ResizeDiagramItemResult {
    newX: number;
    newY: number;
    newWidth: number;
    newHeight: number;
}

export class ResizeLogic {

    private resize: ResizeDirection = new ResizeDirection();

    resizeItemBy(item: DiagramItem, deltaWidth: number, deltaHeight: number): ResizeDiagramItemResult {
        let newX = item.position.x;
        let newY = item.position.y;
        let newWidth = item.size.width;
        let newHeight = item.size.height;
        if (item.resizeDirectionValue == this.resize.upLeft) {
            // deltaWidth и deltaHeight меньше нуля
            newX += deltaWidth;
            newY += deltaHeight;
            newWidth -= deltaWidth;
            newHeight -= deltaHeight;
        } else if (item.resizeDirectionValue == this.resize.upMiddle) {
            // deltaHeight меньше нуля
            newY += deltaHeight;
            newHeight -= deltaHeight;
        } else if (item.resizeDirectionValue == this.resize.upRight) {
            // deltaHeight меньше нуля
            newY += deltaHeight;
            newWidth += deltaWidth;
            newHeight -= deltaHeight;
        } else if (item.resizeDirectionValue == this.resize.middleLeft) {
            // deltaWidth меньше нуля
            newX += deltaWidth;
            newWidth -= deltaWidth;
        } else if (item.resizeDirectionValue == this.resize.middleRight) {
            newWidth += deltaWidth;
        } else if (item.resizeDirectionValue == this.resize.downLeft) {
            // deltaWidth меньше нуля
            newX += deltaWidth;
            newWidth -= deltaWidth;
            newHeight += deltaHeight;
        } else if (item.resizeDirectionValue == this.resize.downMiddle) {
            newHeight += deltaHeight;
        } else if (item.resizeDirectionValue == this.resize.downRight) {
            newWidth += deltaWidth;
            newHeight += deltaHeight;
        }

        return {
            newX: newX,
            newY: newY,
            newWidth: newWidth,
            newHeight: newHeight
        };
    }
}
