import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/data/teacher.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Teacher } from 'src/app/models/data/teacher-model';
import { ApiConfig } from 'src/app/configuration/api-config';
import { Designation } from 'src/app/models/data/designation-model';
import { DesignationService } from 'src/app/services/data/designation.service';
import { SubjectGroup, EducationLevel } from 'src/app/models/common/constants-model';
import { TeacherExtended } from 'src/app/models/data/teacher-extended-model';
import { Qualification } from 'src/app/models/data/qualification-model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {
  designations: Designation[];
  teacher: TeacherExtended;
  qualifications: Qualification[];
  apiBaseUrl = ApiConfig.apiBaseUrl;

  teachers: Teacher[];
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['degree', 'instituteName', 'completionYear', 'result'];
  constructor(
    private teacherService: TeacherService,
    private designationService: DesignationService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute
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
  getSubjectGroupName(v: number): string {
    return SubjectGroup[v];
  }
  getClassLevelName(v: number): string {
    return EducationLevel[v];
  }
  ngOnInit() {
    let id = this.activatedRoute.snapshot.params.id;
    this.teacherService.getByIdEx(id)
      .subscribe(x => {
        this.teacher = x;
        this.qualifications = this.teacher.qualifications.sort((a, b) => a.completionYear - b.completionYear).reverse();
        //console.log(this.teacher.qualifications);
        //console.log(this.qualifications);
        this.listData = new MatTableDataSource(this.qualifications);
      }, err => {
        this.notificationService.success("Cannot retrieve profile data.", "DISMISS");
        return throwError(err);
      });
    this.designationService.get()
      .subscribe(x => {
        this.designations = x;
        //console.log(this.designations);
        
      }, err => {
        this.notificationService.success('Cannot load remote data.', 'DISMISS');
        return throwError(err);
      });
  }

}
