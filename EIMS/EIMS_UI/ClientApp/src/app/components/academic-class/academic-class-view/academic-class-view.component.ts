import { Component, OnInit, ViewChild } from '@angular/core';
import { AcademicClassService } from 'src/app/services/data/academic-class.service';
import { AcademicClass } from 'src/app/models/data/academic-class-model';
import { NotificationService } from 'src/app/services/common/notification.service';
import { throwError } from 'rxjs';
import { AcademicSession } from 'src/app/models/data/academic-session';
import { AcademicSessionService } from 'src/app/services/data/academic-session.service';
import { retry } from 'rxjs/operators';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ShiftService } from 'src/app/services/data/shift.service';
import { ShiftViewModel } from 'src/app/models/view-models/shift-view-model';
import { ShiftType, EducationLevel } from 'src/app/models/common/constants-model';
import { ClassLevelService } from 'src/app/services/data/class-level.service';
import { ClassLevel } from 'src/app/models/data/class-level-model';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-academic-class-view',
  templateUrl: './academic-class-view.component.html',
  styleUrls: ['./academic-class-view.component.css']
})
export class AcademicClassViewComponent implements OnInit {
  isLoading = false;
  currentSession: AcademicSession;
  academicClasses: AcademicClass[];
  listClasses: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['className', 'academicSessionId', 'classLevelId', 'shiftId', 'actions'];

  shifts: ShiftViewModel[];
  classLevels: ClassLevel[];
  constructor(
    private academicClassService: AcademicClassService,
    private academicSessionService: AcademicSessionService,
    public shiftService: ShiftService,
    public classLevelService: ClassLevelService,
    private notificationService: NotificationService,
    private deleteDialog: MatDialog
  ) { }
  confirmDelete(item: AcademicClass) {
    let dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.academicClassService.delete(item)
            .subscribe(x => {
              this.listClasses.data = this.listClasses.data.filter(data => data.academicClassId != item.academicClassId);
              this.notificationService.success("Data deleted.", ["DISMISS"])
            });
        }
        else { console.log("let it go"); }
      }
    );
  }
  fetchAcademicClasses() {
    this.academicClassService.getOfSession(this.currentSession.academicSessionId)
      .subscribe(x => {
        this.academicClasses = x;
        //console.log(x);
        this.listClasses = new MatTableDataSource(this.academicClasses);
        this.listClasses.sort = this.sort;
        this.listClasses.paginator = this.paginator;
      });
  }
  getShiftTypeName(id: number) {
    for (let s of this.shifts) {
      if (s.shiftId == id) {
        return ShiftType[s.shiftType];
      }
    }
  }
  getClassLevelName(id: number) {
    for (let l of this.classLevels) {
      if (l.classLevelId == id) return EducationLevel[l.educationLevel];
    }
  }
  ngOnInit() {
    this.academicSessionService.getRunning()
      .subscribe(x => {
        this.currentSession = x;
        //console.log(this.currentSession.sessionName);
        this.fetchAcademicClasses();
      },
      err => {
        this.notificationService.success("Cannot fetch session data.", "DISMISS");
        return throwError(err);
      });
    this.shiftService.getV1Active()
      .subscribe(x => {
        this.shifts = x;
      });
    this.classLevelService.get()
      .subscribe(x => {
        this.classLevels = x;
      });
  }

}
