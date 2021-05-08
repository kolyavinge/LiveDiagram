import { Component, Input, OnInit } from '@angular/core';
import { Direction } from 'src/app/model/direction';
import { Relation } from 'src/app/model/relation';
import { Segment } from 'src/app/model/segment';

interface Point { x: number, y: number }

@Component({
    selector: 'app-relation',
    templateUrl: './relation.component.html',
    styleUrls: ['./relation.component.css']
})
export class RelationComponent implements OnInit {

    private _direction: Direction = new Direction();
    private _relation: Relation;
    private _segments: Segment[] = [];
    arrowUp: Point;
    arrowDown: Point;

    constructor() { }

    ngOnInit(): void { }

    @Input() get relation(): Relation {
        return this._relation;
    }

    set relation(value: Relation) {
        var self = this;
        self._relation = value;
        self.calculateSegments(self._relation.segments);
        self.calculateArrows();
        self._relation.calculateSegmentsEvent.addHandler((segments) => {
            self.calculateSegments(segments);
            self.calculateArrows();
        });
    }

    get segments(): Segment[] {
        return this._segments;
    }

    calculateSegments(segments: Segment[]): void {
        this._segments = segments.map((s: Segment) => {
            var newX = s.position.x, newY = s.position.y, newWidth = s.size.width, newHeight = s.size.height;
            if (s.size.width == 1) {
                newWidth = 5;
                newX -= 2;
            }
            if (s.size.height == 1) {
                newHeight = 5;
                newY -= 2;
            }
            return new Segment(newX, newY, newWidth, newHeight, s.direction);
        });
    }

    calculateArrows(): void {
        this.arrowDown = null;
        this.arrowUp = null;
        var last = this._segments[this._segments.length - 1];
        if (last.direction == this._direction.up) {
            this.arrowUp = { x: last.position.x - 5, y: last.position.y - 3 };
            last.position.y += 10;
            last.size.height -= 10;
        } else if (last.direction == this._direction.down) {
            this.arrowDown = { x: last.position.x - 5, y: last.position.y + last.size.height - 16 };
            last.size.height -= 10;
        }
    }
}
