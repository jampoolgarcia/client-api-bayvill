import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { configIcons } from 'src/app/config/config-icons';

interface LinkItemI {
    title: string;
    icon: string;
    link: string;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: []
})
export class IndexComponent {

  public listLinkItem: LinkItemI[] = [];

  @ViewChild('drawer') sidenav!: MatSidenav;
  

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {
    this.listLinkItem = [
      {
        title: 'Inicio',
        icon: configIcons.HOME,
        link: '/'
      },
      {
        title: 'Doctor',
        icon: configIcons.DOCTOR,
        link: '/doctor'
      }
    ];
  }

  dawerToggle(){
    this.sidenav.toggle();
  }

}
