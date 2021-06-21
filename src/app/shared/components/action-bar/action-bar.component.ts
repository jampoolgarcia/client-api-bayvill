import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-action-bar',
    templateUrl: './action-bar.component.html',
    styles: ['']
})
export class ActionBarComponent {

    @Input() entity: string = ''; 
    @Input() isDownload: boolean = false;

    @Output() search = new EventEmitter();

    applyFilter(event: Event){
        this.search.emit((event.target as HTMLInputElement).value);
    }

    get downloadUrl(){
        return `${this.entity}/download`
    }

    get isAdd(){
        return (this.entity.length > 0) ? true : false;
    }
}