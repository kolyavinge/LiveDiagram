import { Component, Input, OnInit } from '@angular/core';
import { Direction } from 'src/app/model/direction';
import { Relation } from 'src/app/model/relation';
import { Segment } from 'src/app/model/segment';

interface Point { x: number, y: number }

@Component({
    selector: 'app-relation',
    templateUrl: './relation.component.html',
    styleUrls: ['./relation.component.css', '../../common.css']
})
export class RelationComponent implements OnInit {

    private _direction: Direction = new Direction();
    private _relation: Relation;
    private _segments: Segment[] = [];
    arrowUp: Point;
    arrowDown: Point;
    cap1: Point;
    cap2: Point;

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
        self.calculateCaps();
        self._relation.calculateSegmentsEvent.addHandler((segments) => {
            self.calculateSegments(segments);
            self.calculateArrows();
            self.calculateCaps();
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
            this.arrowUp = { x: last.position.x - 5, y: last.position.y - 2 };
            last.position.y += 10;
            last.size.height -= 10;
        } else if (last.direction == this._direction.down) {
            this.arrowDown = { x: last.position.x - 5, y: last.position.y + last.size.height - 17 };
            last.size.height -= 10;
        }
    }

    calculateCaps(): void {
        this.cap1 = null;
        this.cap2 = null;
        if (this._segments.length == 1) return;
        var first = this._segments[0];
        var second = this._segments[1];
        this.cap1 = { x: first.position.x - 2, y: first.position.y + first.size.height - 10 };
        if (second.direction == this._direction.left) {
            this.cap2 = { x: second.position.x - 4, y: second.position.y - 8 };
        } else if (second.direction == this._direction.right) {
            this.cap2 = { x: second.position.x + second.size.width - 4, y: second.position.y - 8 };
        }
    }

    onMouseDown(): void {
        this.relation.isPointed = true;
    }
}
