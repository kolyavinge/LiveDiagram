import { ElementRef } from '@angular/core';
import { Point } from 'src/app/common/geometry';

export default {

    generateId(): string {
        return Date.now().toString();
    },

    pointInElement(element: ElementRef, event: MouseEvent): Point {
        return new Point(event.x - element.nativeElement.offsetLeft, event.y - element.nativeElement.offsetTop);
    }
};
