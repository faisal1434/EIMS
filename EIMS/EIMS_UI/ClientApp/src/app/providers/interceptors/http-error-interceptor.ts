import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/common/notification.service';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      //console.log(err);
      if (err.status == 401) {
        this.notificationService.success("Unauthorized: must login.", ["DISMISS"]);
      }
      if (err.status == 403) {
        this.notificationService.success("Forbidden: Insufficient credentials.", "DISMISS");
      }
      const error = err.message || err.statusText;

      return throwError(error);
    }));
  }
}
