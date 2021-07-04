import { Component, OnInit } from '@angular/core';
import { AvailableDiagram } from 'src/app/contracts/available-diagram';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-diagram-selector',
    templateUrl: './diagram-selector.component.html',
    styleUrls: ['./diagram-selector.component.css']
})
export class DiagramSelectorComponent implements OnInit {

    availableDiagrams: AvailableDiagram[] = [];

    constructor(
        private _apiService: ApiService
    ) { }

    ngOnInit(): void {
        this._apiService.getAvailableDiagrams({ includeThumbnails: true }).then(response => {
            this.availableDiagrams = response.availableDiagrams;
        });
    }

    selectDiagram(availableDiagram: AvailableDiagram): void {
    }
}
