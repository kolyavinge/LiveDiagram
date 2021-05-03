import { Component, Input, OnInit } from '@angular/core';
import { Relation } from 'src/app/model/relation';

@Component({
    selector: 'app-relation',
    templateUrl: './relation.component.html',
    styleUrls: ['./relation.component.css']
})
export class RelationComponent implements OnInit {

    @Input() relation: Relation;
    
    constructor() { }

    ngOnInit(): void { }

}
