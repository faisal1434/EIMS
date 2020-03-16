import { Component, OnInit } from '@angular/core';
import { ShiftViewModel } from 'src/app/models/view-models/shift-view-model';
import { ShiftService } from 'src/app/services/data/shift.service';
import { ClassPeriodService } from 'src/app/services/data/class-period.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { throwError } from 'rxjs';
import { ShiftType, ClassType } from 'src/app/models/common/constants-model';
import { AuthenticationService } from 'src/app/services/common/authentication.service';

@Component({
  selector: 'app-class-period-view',
  templateUrl: './class-period-view.component.html',
  styleUrls: ['./class-period-view.component.css']
})
export class ClassPeriodViewComponent implements OnInit {

  activeShifts: ShiftViewModel[];
  periodsCollection: any = {};
  //dataSourceCollection: any = {};
  //displayedColumns: string[] = ['period1'];
 
  constructor(
    private shiftService: ShiftService,
    private periodService: ClassPeriodService,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) { }
  getShitName(s: number): string {
    return ShiftType[s];
  }
  getClassTypeName(v: number): string {
    return ClassType[v];
  }
  getPeriodName(i: number): string {
    switch (i) {
      case 1: return "1st Period";
      case 2: return "2nd Period";
      case 3: return "3rd Period";
      case 4: return "";
      case 5:
      case 6:
      case 7: return `${i - 1}th Period`;
    }
  }
  fetchPeriods() {
    this.activeShifts.forEach(s => {
      console.log(s);
      //this.periodsCollection[this.getShitName(s.shiftType)] = [];
      this.fetchShiftPeriods(s);
      //console.log(this.periodsCollection);
    });
  }
  fetchShiftPeriods(s: ShiftViewModel) {
    this.periodService.getGenerated(s.shiftId)
      .subscribe(x => {
        console.log(x);
        this.periodsCollection[this.getShitName(s.shiftType)] = x;
        //let ds: MatTableDataSource<any> = new MatTableDataSource(this.periodsCollection[this.getShitName(s.shiftType)]);
        //this.dataSourceCollection[this.getShitName(s.shiftType)] = ds;
        //console.log(this.periodsCollection[this.getShitName(s.shiftType)]);
      });
  }
  regenerate(s: ShiftViewModel) {
    if (!this.authenticationService.isLogged) {
      this.notificationService.success("Please log in to regenerate", "DISMISS");
      return;
    }
    this.periodService.regenerate(s.shiftId)
      .subscribe(x => {
        this.periodsCollection[this.getShitName(s.shiftType)] = x;
      });
  }
  ngOnInit() {
    this.shiftService.getV1Active()
      .subscribe(x => {
        this.activeShifts = x;
        this.fetchPeriods();
      },
      err => {
        this.notificationService.success("Failed to fetch shift settings.", "DISMISS");
        return throwError(err);
      });

  }

}
