import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherService } from 'src/app/services/data/teacher.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { ApiConfig } from 'src/app/configuration/api-config';
import { Designation } from 'src/app/models/data/designation-model';
import { Teacher } from 'src/app/models/data/teacher-model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { EmployeeType, SubjectGroup, EducationLevel } from 'src/app/models/common/constants-model';
import { throwError } from 'rxjs';
import { DesignationService } from 'src/app/services/data/designation.service';



@Component({
  selector: 'app-teacher-view',
  templateUrl: './teacher-view.component.html',
  styleUrls: ['./teacher-view.component.css']
})
export class TeacherViewComponent implements OnInit {

  ///
  // ***********Fields*****
  //***********************
  imageBaseUrl = ApiConfig.apiBaseUrl;
  designations: Designation[];
  isLoading = false;
  teachers: Teacher[];
  listData: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['picture', 'employeeName', 'designationId','classLevel','subjectGroup', 'phone', 'email', 'actions'];
  constructor(
    private teacherService: TeacherService,
    private designationService: DesignationService,
    private notificationService: NotificationService

  ) { }
  getDesignationName(id: number) {
    if (!this.designations) return '';
    let n = '';
    for (let d of this.designations) {
      if (d.designationId == id) {
        n = d.postName;
        break;
      }
    }
    return n;
  }
  getEmployeeTypeName(v: number): string {
    return EmployeeType[v];
  }
  getSubjectGroupName(v: number): string {
    return SubjectGroup[v];
  }
  getClassLevelName(v: number): string {
    return EducationLevel[v];
  }
  applyFilter(filterValue: string) {
    // console.log(filterValue);
    this.listData.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    console.log(this.imageBaseUrl);
    this.teacherService.get()
      .subscribe(x => {
        this.teachers = x;
        console.log(this.teachers)
        this.listData = new MatTableDataSource<any>(this.teachers);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
    this.designationService.get()
      .subscribe(x => {
        this.designations = x;
        //console.log(this.designations);
        console.log(this.imageBaseUrl)
      }, err => {
        this.notificationService.success('Cannot load remote data.', 'DISMISS');
        return throwError(err);
      });
  }

}


