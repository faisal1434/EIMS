import { Component, OnInit, ViewChild } from '@angular/core';
import { EducationLevel, SubjectScope, SubjectGroup, SubjectType } from 'src/app/models/common/constants-model';
import { ClassLevelService } from 'src/app/services/data/class-level.service';
import { ClassLevel } from 'src/app/models/data/class-level-model';
import { NotificationService } from 'src/app/services/common/notification.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Subject } from 'src/app/models/data/subject-model';
import { SubjectService } from 'src/app/services/data/subject.service';
import { throwError } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-subject-view',
  templateUrl: './subject-view.component.html',
  styleUrls: ['./subject-view.component.css']
})
export class SubjectViewComponent implements OnInit {
  ///
  // Fields
  ///
  isLoading = false;
  activeLevels: ClassLevel[];
  subjects: Subject[];

  listData: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['subjectName', 'subjectCode', 'classLevelId', 'subjectScope', 'subjectGroup', 'subjectType', 'actions'];


  constructor(
    private classLevelService: ClassLevelService,
    public subjecService: SubjectService,
    private notificationService: NotificationService,
    private deleteDialog: MatDialog
  ) { }
  confirmDelete(item: Subject) {
    let dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.subjecService.delete(item)
            .subscribe(x => {
              this.listData.data = this.listData.data.filter(data => data.sujectId != item.subjectId);
              this.notificationService.success("Data deleted.", ["DISMISS"])
            });
        }
        else { console.log("let it go"); }
      }
    );
  }
  getClassLevelName(v: number): string {
    return EducationLevel[v];
  }
  getSubjectScopeName(v: number): string {
    return SubjectScope[v];
  }
  getSubjectGroupName(v: number): string {
    return SubjectGroup[v];
  }
  getSubjectTypeName(v: number): string {
    return SubjectType[v];
  }
  applyFilter(filterValue: number) {

    this.listData.data = this.subjects.filter(data => filterValue ? data.classLevelId == filterValue : true);

  }
  ngOnInit() {
    this.isLoading = true;
    this.classLevelService.getActive()
      .subscribe(x => {
        this.activeLevels = x;
        //console.log(this.activeLevels);
        
      },
      err => {
        this.notificationService.success("Cannot load remote data.", "DISMISS");
        this.isLoading = false;
        return throwError(err);
      });
    this.subjecService.get()
      .subscribe(x => {
        this.subjects = x;
        this.listData = new MatTableDataSource(this.subjects);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }, err => {
        this.notificationService.success("Cannot load remote data.", "DISMISS");
        this.isLoading = false;
        return throwError(err);
      });
    this.isLoading = false;
  }

}
