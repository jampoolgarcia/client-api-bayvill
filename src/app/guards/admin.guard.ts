import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router){}  
  
  
  canActivate() {

    let user =  JSON.parse(localStorage.getItem('currentUser')!) || null;

    if(user){
      if(Object.is(user.role, 2)){
        return true;
      }
    }

    this.router.navigate(['/security/login']);
    return false;
  }
  
}
