import { Point } from 'src/app/common/geometry';

export default {

    generateId(): string {
        return Date.now().toString();
    },

    pointInElement(nativeElement: any, event: MouseEvent): Point {
        return new Point(
            event.x - nativeElement.offsetLeft + nativeElement.scrollLeft,
            event.y - nativeElement.offsetTop + nativeElement.scrollTop);
    }
};
