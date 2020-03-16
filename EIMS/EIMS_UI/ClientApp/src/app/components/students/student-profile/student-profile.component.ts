import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/common/notification.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/data/student-model';
import { StudentService } from 'src/app/services/data/student.service';
import { Section } from 'src/app/models/data/section-model';
import { SectionService } from 'src/app/services/data/section.service';
import { throwError } from 'rxjs';
import { ApiConfig } from 'src/app/configuration/api-config';
import { BloodGroupName } from 'src/app/models/common/blood-group-name-model';
import { BloodGroup } from 'src/app/models/common/constants-model';
import { Gender } from 'src/app/models/common/contants-model';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  student: Student;
  sections: Section[];
  apiBaseUrl = ApiConfig.apiBaseUrl;
  constructor(
    private studentService: StudentService,
    private sectionService: SectionService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute
  ) { }
  getBloodGroupName(v: number): string {
    return BloodGroupName[BloodGroup[v]];
  }
  getSectionClassName(id: number): string {
    if (!this.sections) return '';
    let s = this.sections.find(x => x.sectionId == id);
    return s ? `${s.sectionName}/${s.academicClass.className}` : '';
  }
  getGenderName(v: number): string {
    return Gender[v];
  }
  ngOnInit() {
    let id = this.activatedRoute.snapshot.params.id;
    this.studentService.getById(id)
      .subscribe(x => {
        this.student = x;
        console.log(this.student);
      }, err => {
        this.notificationService.success("Cannot retrieve profile data.", "DISMISS");
        return throwError(err);
      });
    this.sectionService.getEx()
      .subscribe(x => {
        this.sections = x;
      });
  }

}
