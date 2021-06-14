
export class Geometry {

    static pointInRectangle(x, y, rectX, rectY, rectWidth, rectHeight): boolean {
        return rectX <= x && x <= rectX + rectWidth &&
            rectY <= y && y <= rectY + rectHeight;
    }

    static lineCrossed(horizontX, horizontY, width, verticalX, verticalY, height): boolean {
        return horizontX <= verticalX && verticalX <= horizontX + width &&
            verticalY <= horizontY && horizontY <= verticalY + height;
    }
}
