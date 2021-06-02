import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styles: [] 
})
export class NavComponent {
    
    public userName: string = '';

    constructor(){
        let user = JSON.parse(localStorage.getItem('currentUser')!) || null;

        if(user){
            this.userName = `${user.firstName} ${user.lastName}`
        }
    }


}