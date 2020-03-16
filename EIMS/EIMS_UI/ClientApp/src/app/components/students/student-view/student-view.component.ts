import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from 'src/app/models/data/student-model';
import { Section } from 'src/app/models/data/section-model';
import { SectionService } from 'src/app/services/data/section.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { StudentService } from 'src/app/services/data/student.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ApiConfig } from 'src/app/configuration/api-config';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {
  imageBaseUrl = ApiConfig.apiBaseUrl;
  students: Student[];
  sections: Section[];
  listData: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['picture', 'studentName','roll', 'sectionId', 'birthDate','actions' ];
  constructor(
    private sectionService: SectionService,
    private studentService: StudentService,
    private notificationService: NotificationService
  ) { }
  getSectionClassName(id: number): string {
    if (!this.sections) return '';
    let s = this.sections.find(x => x.sectionId == id);
    return s ? `${s.sectionName}/${s.academicClass.className}` : '';
  }
  ngOnInit() {
    this.sectionService.getEx()
      .subscribe(x => {
        this.sections = x;
      });
    this.studentService.get()
      .subscribe(x => {
        this.students = x;
        console.log(this.students);
        this.listData = new MatTableDataSource(this.students);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      })
  }

}
