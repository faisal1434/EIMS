import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavItem } from '../configuration/nav-item';
import { ApiConfig } from '../configuration/api-config';
import { AuthenticationService } from '../services/common/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
    
  //fields
  isLogged = false;
  username = '';
  navItems: NavItem[];

  config = {
    paddingAtStart: true,
    classname: 'my-custom-class',
    listBackgroundColor: '#fff',
    fontColor: 'rgb(8, 54, 71)',
    backgroundColor: '#fff',
    selectedListFontColor: 'red',
    collapseOnSelect:true
  };
  //
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  selectedItem($event) {
    if ($event.link) {
      this.router.navigateByUrl($event.link);
    }
  }
  constructor
    (
    private breakpointObserver: BreakpointObserver,
    private authenticationService: AuthenticationService,
    private router: Router

  ) { }
  ngOnInit(): void {
    this.navItems = ApiConfig.navItems;
    //console.log(this.navItems);
    this.isLogged = this.authenticationService.isLogged;
    if (this.isLogged) this.username = this.authenticationService.currentUserLogged.username;
    this.authenticationService.getLoginChangeEmitter().subscribe(
      x => {
        if (x === 'login') {
          //console.log(this.authSvc.currentUserValue);
          this.isLogged = this.authenticationService.isLogged;
          this.username = this.authenticationService.currentUserLogged.username;
          //console.log(this.authenticationService.currentUserLogged);
        }
        if (x === 'logout') {
          this.isLogged = false;
          this.username = '';
        }

      });
  }
}
