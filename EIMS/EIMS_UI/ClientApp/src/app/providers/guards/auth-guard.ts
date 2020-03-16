import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'src/app/services/common/authentication.service';
import { NotificationService } from 'src/app/services/common/notification.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private notificationService: NotificationService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    //console.log(currentUser);
    if (currentUser) {

      // check if route is restricted by role
      if (route.data.roles && !this.authService.roleMatch(route.data.roles)) {
        // role not authorised so redirect to home page
        //this.router.navigate(['/forbidden']);
        this.notificationService.success("Forbidden: Insufficient credentials. Login session terminated", "DISMISS");
        this.authService.logout();
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    //this.router.navigate(['/access-denied'], { queryParams: { returnUrl: state.url } });
    this.notificationService.success("Unauthorized: must login.", ["DISMISS"]);
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
