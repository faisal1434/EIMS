import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    duration: 3000
    //duration: 3000,
    //horizontalPosition: 'right',
    //verticalPosition: 'top'
  }


  success(msg, action) {
    //this.config['panelClass'] = ['success'];
    // const successMsg = `<mat-icon>check_circle_outline</mat-icon> ${msg}`;
    this.snackBar.open(msg, action, this.config);
  }
  
}
