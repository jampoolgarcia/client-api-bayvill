import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styles: [] 
})
export class NavComponent {

    @Output() eventToggle = new EventEmitter(); 
    
    public userFullName: string = '';
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    constructor(
        private breakpointObserver: BreakpointObserver,
        private _service: AuthService,
        private router: Router,
        ){
        let user = JSON.parse(localStorage.getItem('currentUser')!) || null;

        if(user){
            this.userFullName = `${user.firstName} ${user.lastName}`
        }
    }

    onLogout(): void {
        this._service.logout().subscribe(
            data => {
              localStorage.clear();
              this.router.navigate(['/auth']);
            }, err =>{
              console.log("logout", err);
            })
    }

    handleToggel(): void {
        this.eventToggle.emit();
    }

}