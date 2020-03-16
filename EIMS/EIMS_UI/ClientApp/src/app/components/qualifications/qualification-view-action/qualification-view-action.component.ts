import { Component, OnInit, ViewChild } from '@angular/core';
import { Teacher } from 'src/app/models/data/teacher-model';
import { Qualification } from 'src/app/models/data/qualification-model';
import { TeacherService } from 'src/app/services/data/teacher.service';
import { QualificationService } from 'src/app/services/data/qualification.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { throwError } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-qualification-view-action',
  templateUrl: './qualification-view-action.component.html',
  styleUrls: ['./qualification-view-action.component.css']
})
export class QualificationViewActionComponent implements OnInit {
  
  isLoading = false;
  displayForm = false;
  teachers: Teacher[];
  qualifications: Qualification[];
  selectedTeacherId = null;

  listData: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['completionYear', 'degree', 'instituteName', 'result', 'actions'];
  qualificationForm: FormGroup = new FormGroup({
    completionYear: new FormControl('', Validators.required),
    degree: new FormControl('', Validators.required),
    instituteName: new FormControl('', Validators.required),
    result: new FormControl('', Validators.required)
  });
  btnOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Save',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
    buttonIcon: {
      fontIcon: 'save_alt'
    }
  };
  constructor(
    private teacherService: TeacherService,
    private qualificationService: QualificationService,
    private notificationService: NotificationService,
    private deleteDialog: MatDialog
  ) { }
  get f() {
    return this.qualificationForm.controls;
  }
  getTeacherName(id: number) {
    if (!this.teachers) return null;
    let name = '';
    for (let t of this.teachers) {
      if (t.employeeId == id) {
        name = t.employeeName;
        break;
      }
    }
    return name;
  }
  confirmDelete(item: Qualification) {
    let dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      width: '450px'
    });
    console.log
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.qualificationService.delete(item)
            .subscribe(x => {
              this.listData.data = this.listData.data.filter(data => data.qualificationId != item.qualificationId);
              this.notificationService.success("Data deleted.", ["DISMISS"])
            });
        }
        else { console.log("let it go"); }
      }
    );
  }
  showForm() {
    //console.log(this.displayForm);
    this.displayForm = !this.displayForm;
    //console.log(this.displayForm);
  }
  selectTeacher(id: number) {
    this.isLoading = true;
    this.selectedTeacherId = id;
    //console.log(this.selectedTeacherId);
    if (id == null) {
      this.listData.data = [];
      this.isLoading = false;
      return;
    }
    this.qualificationService.getTeacherQualification(id)
      .subscribe(x => {
        this.qualifications = x;
        this.listData = new MatTableDataSource(this.qualifications);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.isLoading = false;
      }, err => {
        this.notificationService.success("Failed to load teacher qualifications.", 'DISMISS');
        this.isLoading = false;
        return throwError(err);
      });
  }
  onSubmit() {
    if (!this.selectedTeacherId) {
      this.notificationService.success("Select teacher first.", "DISMISS");
      return;
    }
    if (!this.qualificationForm.valid) return;
    this.btnOptions.active = true;
    let data: Qualification = new Qualification();
    data.completionYear = this.f.completionYear.value;
    data.degree = this.f.degree.value;
    data.instituteName = this.f.instituteName.value;
    data.result = this.f.result.value;
    data.employeeId = this.selectedTeacherId;
    console.log(data);
    this.qualificationService.post(data)
      .subscribe(x => {
        this.notificationService.success("Data saved successfuly.", 'DISMISS');
        let list = this.listData.data;
        list.push(x);
        this.listData.data = list;
        this.qualificationForm.reset({});
        this.qualificationForm.markAsPristine();
        this.btnOptions.active = false;
      }, err => {
        this.notificationService.success("Failed to save data.", 'DISMISS');
        this.btnOptions.active = false;
        return throwError(err);
      });
  }
  ngOnInit() {
    this.isLoading = true;
    this.teacherService.get()
      .subscribe(x => {
        this.teachers = x;
        this.isLoading = false;
      }, err => {
        this.notificationService.success("Failed to load teacher list.", 'DISMISS');
        this.isLoading = false;
        return throwError(err);
      });
  }

}
