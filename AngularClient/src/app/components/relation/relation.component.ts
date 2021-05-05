import { Component, Input, OnInit } from '@angular/core';
import { Relation } from 'src/app/model/relation';
import { Segment, SegmentKind } from 'src/app/model/segment';

@Component({
    selector: 'app-relation',
    templateUrl: './relation.component.html',
    styleUrls: ['./relation.component.css']
})
export class RelationComponent implements OnInit {

    @Input() relation: Relation;
    kind: SegmentKind = new SegmentKind();

    constructor() { }

    ngOnInit(): void { }

    get lines(): Segment[] {
        return this.relation.segments.filter(x => x.kind == this.kind.line);
    }

    get arrowDown(): Segment {
        return this.relation.segments.find(x => x.kind == this.kind.arrowDown);
    }

    get arrowUp(): Segment {
        return this.relation.segments.find(x => x.kind == this.kind.arrowUp);
    }
}
