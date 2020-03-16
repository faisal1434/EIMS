import { Component, OnInit } from '@angular/core';
import { AcademicSessionService } from 'src/app/services/data/academic-session.service';
import { ShiftService } from 'src/app/services/data/shift.service';
import { AcademicClassService } from 'src/app/services/data/academic-class.service';
import { ClassLevelService } from 'src/app/services/data/class-level.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { AcademicSession } from 'src/app/models/data/academic-session';
import { ShiftViewModel } from 'src/app/models/view-models/shift-view-model';
import { ClassLevel } from 'src/app/models/data/class-level-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { EducationLevel, ShiftType, SessionStatus } from 'src/app/models/common/constants-model';
import { ActivatedRoute } from '@angular/router';
import { AcademicClass } from 'src/app/models/data/academic-class-model';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-academic-class-edit',
  templateUrl: './academic-class-edit.component.html',
  styleUrls: ['./academic-class-edit.component.css']
})
export class AcademicClassEditComponent implements OnInit {
  academicClass: AcademicClass;
  academicSessionOptions: AcademicSession[];
  shifts: ShiftViewModel[];
  classLevels: ClassLevel[];
  classForm: FormGroup = new FormGroup({
    className: new FormControl('', Validators.required),
    academicSessionId: new FormControl('', Validators.required),
    classLevelId: new FormControl('', Validators.required),
    shiftId: new FormControl('', Validators.required)
  });
  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Update',
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
    private academicSessionService: AcademicSessionService,
    public shiftService: ShiftService,
    private academicClassService: AcademicClassService,
    private classLevelService: ClassLevelService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute
  ) { }
  get f() {
    return this.classForm.controls;
  }
  getEducationLevelName(v: number): string {
    return EducationLevel[v];
  }
  getShiftTypeName(v: number): string {
    return ShiftType[v];
  }
  initForm() {
    this.classForm.setValue({
      className: this.academicClass.className,
      academicSessionId: this.academicClass.academicSessionId,
      classLevelId: this.academicClass.classLevelId,
      shiftId: this.academicClass.shiftId
    });
  }
  onSubmit() {
    if (!this.classForm.valid) return;
    this.spinnerButtonOptions.active = true;
    this.academicClass.className = this.f.className.value;
    this.academicClass.academicSessionId = this.f.academicSessionId.value;
    this.academicClass.classLevelId = this.f.classLevelId.value;
    this.academicClass.academicSessionId = this.f.academicSessionId.value;
    this.academicClass.shiftId = this.f.shiftId.value;
    //console.log(this.classForm.value);
    //console.log(this.academicClass);
    this.academicClassService.put(this.academicClass)
      .subscribe(x => {
        this.notificationService.success("Data updated successfuly.", "DISMISS");
        this.classForm.markAsPristine();
        this.spinnerButtonOptions.active = false;
      });
  }
  ngOnInit() {
    let id = this.activatedRoute.snapshot.params.id;
    this.academicClassService.getById(id)
      .subscribe(x => {
        this.academicClass = x;
        this.initForm();
      })
    this.academicSessionService.get()
      .subscribe(x => {
        this.academicSessionOptions = x.filter((v, i) => {
          return v.sessionStatus == SessionStatus.Running || v.sessionStatus == SessionStatus.Active
        });

      });
    this.shiftService.getV1Active()
      .subscribe(x => {
        this.shifts = x;
      });
    this.classLevelService.getActive()
      .subscribe(x => {
        this.classLevels = x;
      });
  }

}
