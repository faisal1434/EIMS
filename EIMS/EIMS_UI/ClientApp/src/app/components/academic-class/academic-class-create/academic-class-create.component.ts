import { Component, OnInit } from '@angular/core';
import { AcademicSessionService } from 'src/app/services/data/academic-session.service';
import { AcademicClassService } from 'src/app/services/data/academic-class.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { SessionStatus, EducationLevel, ShiftType } from 'src/app/models/common/constants-model';
import { AcademicSession } from 'src/app/models/data/academic-session';
import { ClassLevel } from 'src/app/models/data/class-level-model';
import { ShiftViewModel } from 'src/app/models/view-models/shift-view-model';
import { ShiftService } from 'src/app/services/data/shift.service';
import { ClassLevelService } from 'src/app/services/data/class-level.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { retry } from 'rxjs/operators';
import { AcademicClass } from 'src/app/models/data/academic-class-model';

@Component({
  selector: 'app-academic-class-create',
  templateUrl: './academic-class-create.component.html',
  styleUrls: ['./academic-class-create.component.css']
})
export class AcademicClassCreateComponent implements OnInit {

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
    text: 'Insert',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
    buttonIcon: {
      fontIcon:'save_alt'
    }
  };
  constructor(
    private academicSessionService: AcademicSessionService,
    public shiftService: ShiftService,
    private academicClassService: AcademicClassService,
    private classLevelService: ClassLevelService,
    private notificationService: NotificationService
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
  onSubmit() {
    if (!this.classForm.valid) return;
    //console.log(this.classForm.value);
    this.spinnerButtonOptions.active = true;
    this.academicClassService.post(<AcademicClass>this.classForm.value)
      .subscribe(x => {
        this.notificationService.success("Data saved successfully.", "DISMISS");
        this.spinnerButtonOptions.active = false;
        this.classForm.reset({});
        this.classForm.markAsPristine();
      },
      err => {
        this.notificationService.success("Failed to save data.", "DISMISS");
        this.spinnerButtonOptions.active = false;
      });
  }
  ngOnInit() {
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
