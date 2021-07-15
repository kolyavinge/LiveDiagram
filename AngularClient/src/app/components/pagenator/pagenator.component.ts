import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface PageButton {
    title: string;
    page: number;
}

@Component({
    selector: 'app-pagenator',
    templateUrl: './pagenator.component.html',
    styleUrls: ['./pagenator.component.css']
})
export class PagenatorComponent implements OnInit {

    private _totalPagesCount: number = 0;
    private _totalItemsCount: number = 0;
    private _displayPagesCount: number = 0;
    private _pageNumber: number = 0;

    pageButtons: PageButton[] = [];
    firstPageEnabled: boolean = false;
    prevPageEnabled: boolean = false;
    nextPageEnabled: boolean = true;
    lastPageEnabled: boolean = true;
    @Input() pageSize: number = 0;
    @Input() maxDisplayPagesCount: number = 0;

    get pageNumber(): number {
        return this._pageNumber;
    }

    @Input() set pageNumber(value: number) {
        this.gotoPage(value);
    }

    @Output() pageNumberChange = new EventEmitter<number>();

    constructor() { }

    @Input() set totalItemsCount(value: number) {
        this._totalItemsCount = value;
        this._totalPagesCount = Math.trunc(this._totalItemsCount / this.pageSize);
        if (this._totalItemsCount % this.pageSize !== 0) {
            this._totalPagesCount++;
        }
        this._displayPagesCount = Math.min(this.maxDisplayPagesCount, this._totalPagesCount);
        this.calculatePageButtons();
        this.updateButtonsEnabled();
    }

    ngOnInit(): void { }

    firstPage(): void {
        this.gotoPage(0);
    }

    prevPage(): void {
        if (this._pageNumber > 0) {
            this.gotoPage(this._pageNumber - 1);
        }
    }

    nextPage(): void {
        if (this._pageNumber < this._totalPagesCount - 1) {
            this.gotoPage(this._pageNumber + 1);
        }
    }

    lastPage(): void {
        this.gotoPage(this._totalPagesCount - 1);
    }

    gotoPage(pageNumber: number): void {
        if (this._pageNumber !== pageNumber) {
            this._pageNumber = pageNumber;
            this.calculatePageButtons();
            this.updateButtonsEnabled();
            this.pageNumberChange.emit(this._pageNumber);
        }
    }

    private calculatePageButtons(): void {
        let delta = this._pageNumber - Math.trunc(this._displayPagesCount / 2);
        if (delta < 0) delta = 0;
        if (delta + this._displayPagesCount >= this._totalPagesCount) delta = this._totalPagesCount - this._displayPagesCount;
        let numbers = [];
        for (let i = 0; i < this._displayPagesCount; i++) {
            numbers.push(i + delta);
        }
        this.pageButtons = numbers.map(n => ({ title: n + 1, page: n }));
    }

    private updateButtonsEnabled(): void {
        this.firstPageEnabled = this._pageNumber > 0;
        this.prevPageEnabled = this._pageNumber > 0;
        this.nextPageEnabled = this._pageNumber < this._totalPagesCount - 1;
        this.lastPageEnabled = this._pageNumber < this._totalPagesCount - 1;
    }
}
