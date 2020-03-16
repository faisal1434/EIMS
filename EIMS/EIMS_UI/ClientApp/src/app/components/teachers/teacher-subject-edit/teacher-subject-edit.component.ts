import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiConfig } from 'src/app/configuration/api-config';
import { TeacherSubject } from 'src/app/models/data/teacher-subject';
import { TeacherSubjectService } from 'src/app/services/data/teacher-subject.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from 'src/app/services/data/teacher.service';
import { Teacher } from 'src/app/models/data/teacher-model';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { EducationLevel } from 'src/app/models/common/constants-model';
import { SubjectGroup } from 'src/app/models/common/contants-model';
import { Subject } from 'src/app/models/data/subject-model';
import { SubjectService } from 'src/app/services/data/subject.service';
import { retry } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-teacher-subject-edit',
  templateUrl: './teacher-subject-edit.component.html',
  styleUrls: ['./teacher-subject-edit.component.css']
})
export class TeacherSubjectEditComponent implements OnInit {
  imageBaseUrl = ApiConfig.apiBaseUrl;
  subjects: Subject[];
  subjectFiltered: Subject[];
  teacherSubjects: TeacherSubject[];
  teacher: Teacher;
  listData: MatTableDataSource<any>;
  displayedColumns = ['subjectId', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  teacherSubjectForm: FormGroup = new FormGroup({
    subjectId: new FormControl('', Validators.required)
  });
  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Add',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
    buttonIcon: {
      fontIcon:'add'
    }
  };
  get f() {
    return this.teacherSubjectForm.controls;
  }
  constructor(
    private teacherSubjectService: TeacherSubjectService,
    private subjectService: SubjectService,
    private teacherService: TeacherService,
    private notificationService: NotificationService,
    private activateRoute: ActivatedRoute,
    private delDialog: MatDialog
  ) { }
  confirmDelete(item: TeacherSubject) {
    let dialogRef = this.delDialog.open(DeleteDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.teacherSubjectService.delete(item)
            .subscribe(x => {
              this.listData.data = this.listData.data.filter(data => data.teacherSubjectId != item.teacherSubjectId);
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
  getSubjectGroupName(v: number): string {
    return SubjectGroup[v];
  }
  getSubjectName(id) {
    if (!this.subjects) return '';
    let s = this.subjects.find(x => x.subjectId == id);
    return s ? s.subjectName : '';
  }
  filterSubjects() {
    let g = this.teacher.subjectGroup;
    this.subjectFiltered = this.subjects.filter((v, i) => {
      let g1 = v.subjectGroup | SubjectGroup.General;
      return this.teacher ? g1 == g : true;
    });
    console.log(this.subjectFiltered);
  }
  onSubmit() {
    console.log('posting');
    if (!this.teacherSubjectForm.valid) return;
    let found = this.teacherSubjects.find(ts => ts.subjectId == this.f.subjectId.value);
    if (found) {
      this.notificationService.success("SUbject already assigned to teacher.", "DISMISS");
      return;
    }
    let data: TeacherSubject = new TeacherSubject();
    data.employeeId = this.teacher.employeeId;
    data.subjectId = this.f.subjectId.value;
    this.teacherSubjectService.post(data)
      .subscribe(x => {
        let data = this.listData.data;
        data.push(x);
        this.listData.data = data;
      })
    console.log(data);
  }
  fetchTeacherSubjects(id) {
    this.teacherSubjectService.getByIdExWithAll(id)
      .subscribe(x => {
        this.teacherSubjects = x;
        this.listData = new MatTableDataSource(this.teacherSubjects);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        console.log(this.teacherSubjects);
        this.fetchTeacher(id);
      });
  }
  fetchTeacher(id) {
    this.teacherService.getById(id)
      .subscribe(x => {
        this.teacher = x;
        console.log(this.teacher);
        this.fetchSubject();
      });
  }
  fetchSubject() {
    this.subjectService.get()
      .subscribe(x => {
        this.subjects = x;
        this.filterSubjects();
      })
  }
  ngOnInit() {
    let id = this.activateRoute.snapshot.params.id;
    this.fetchTeacherSubjects(id);
   
    
  }

}
