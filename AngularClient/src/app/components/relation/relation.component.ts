import { Component, Input, OnInit } from '@angular/core';
import { Direction } from 'src/app/model/direction';
import { Point } from 'src/app/common/point';
import { Size } from 'src/app/common/size';
import { Relation } from 'src/app/model/relation';
import { Segment } from 'src/app/model/segment';

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
        let self = this;
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
            let newX = s.position.x;
            let newY = s.position.y;
            let newWidth = s.size.width;
            let newHeight = s.size.height;
            if (s.size.width === 1) {
                newWidth = 5;
                newX -= 2;
            }
            if (s.size.height === 1) {
                newHeight = 5;
                newY -= 2;
            }
            return new Segment(newX, newY, newWidth, newHeight, s.direction);
        });
    }

    calculateArrows(): void {
        this.arrowDown = null;
        this.arrowUp = null;
        let last = this._segments[this._segments.length - 1];
        if (last.direction === this._direction.up) {
            this.arrowUp = new Point(last.position.x - 5, last.position.y - 2);
            last.position = new Point(last.position.x, last.position.y + 10);
            last.size = new Size(last.size.width, last.size.height - 10);
        } else if (last.direction === this._direction.down) {
            this.arrowDown = new Point(last.position.x - 5, last.position.y + last.size.height - 17);
            last.size = new Size(last.size.width, last.size.height - 10);
        }
    }

    calculateCaps(): void {
        this.cap1 = null;
        this.cap2 = null;
        if (this._segments.length === 1) return;
        let first = this._segments[0];
        let second = this._segments[1];
        this.cap1 = new Point(first.position.x - 2, first.position.y + first.size.height - 10);
        if (second.direction === this._direction.left) {
            this.cap2 = new Point(second.position.x - 4, second.position.y - 8);
        } else if (second.direction === this._direction.right) {
            this.cap2 = new Point(second.position.x + second.size.width - 4, second.position.y - 8);
        }
    }

    onMouseDown(): void {
        this.relation.isPointed = true;
    }
}
