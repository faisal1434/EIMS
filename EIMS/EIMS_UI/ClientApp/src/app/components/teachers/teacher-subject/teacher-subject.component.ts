import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherSubjectService } from 'src/app/services/data/teacher-subject.service';
import { Teacher } from 'src/app/models/data/teacher-model';
import { TeacherSubjectViewModel } from 'src/app/models/view-models/teacher-subject-view-model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { NotificationService } from 'src/app/services/common/notification.service';
import { throwError } from 'rxjs';
import { ApiConfig } from 'src/app/configuration/api-config';

@Component({
  selector: 'app-teacher-subject',
  templateUrl: './teacher-subject.component.html',
  styleUrls: ['./teacher-subject.component.css']
})
export class TeacherSubjectComponent implements OnInit {
  imageBaseUrl = ApiConfig.apiBaseUrl;
  teacherSubjects: TeacherSubjectViewModel[];
  listData: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['picture', 'employeeName', 'subjects','actions'];
  constructor(
    private teacherSubjectService: TeacherSubjectService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.teacherSubjectService.getEx()
      .subscribe(x => {
        this.teacherSubjects = x;
        console.log(this.teacherSubjects);
        this.listData = new MatTableDataSource(this.teacherSubjects);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }, err => {
        this.notificationService.success('Cannot load remote data.', 'DISMISS');
        return throwError(err);
      });
  }

}
