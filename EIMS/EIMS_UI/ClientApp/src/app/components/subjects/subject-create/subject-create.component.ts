import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/data/subject.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { ClassLevel } from 'src/app/models/data/class-level-model';
import { ClassLevelService } from 'src/app/services/data/class-level.service';
import { throwError } from 'rxjs';
import { EducationLevel, SubjectScope, SubjectGroup, SubjectType } from 'src/app/models/common/constants-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { Subject } from 'src/app/models/data/subject-model';

@Component({
  selector: 'app-subject-create',
  templateUrl: './subject-create.component.html',
  styleUrls: ['./subject-create.component.css']
})
export class SubjectCreateComponent implements OnInit {
  ///
  // Fields
  ///
  activeLevels: ClassLevel[];
  subjectScopeOptions: any[] = [];
  subjectGroupOptions: any[] = [];
  subjectTypeOptions: any[] = [];
  subjectForm: FormGroup = new FormGroup({
    subjectName: new FormControl('', Validators.required),
    subjectCode: new FormControl('', Validators.required),
    classLevelId: new FormControl('', Validators.required),
    subjectScope: new FormControl('', Validators.required),
    subjectGroup: new FormControl('', Validators.required),
    subjectType: new FormControl('', Validators.required)
  });
  //
  pscDisbaled = false;
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
    private subjectService: SubjectService,
    public classLevelService: ClassLevelService,

    private notificationService: NotificationService
  ) { }
  get f() {
    return this.subjectForm.controls;
  }
  getClassLevelName(v: number): string {
    return EducationLevel[v];
  }
  getScopeDisable(v) {
    if (v == SubjectScope.HSC)
      return this.pscDisbaled;
    else if (v == SubjectScope.SSC)
      return this.pscDisbaled;
    else if (v == SubjectScope.HSC)
      return this.pscDisbaled;
    else if (v == SubjectScope.JSC)
      return this.pscDisbaled;
    else
      return !this.pscDisbaled;
  }
  onClassLevelChange(value) {
    let selectedLevel = this.activeLevels.find(x => x.classLevelId == value);
    //console.log(selectedLevel.educationLevel);
    if (selectedLevel.educationLevel == EducationLevel.JSC) {
      console.log("JSC");
      this.f.subjectScope.setValue(SubjectScope.JSC);
      this.f.subjectGroup.setValue(SubjectGroup.General);
      this.f.subjectType.setValue(SubjectType.Compulsory);
      this.subjectForm.get("subjectScope").disable();
      this.subjectForm.get("subjectGroup").disable();
      this.subjectForm.get("subjectType").disable();
      console.log(this.f.subjectType.value);
    }
    else if (selectedLevel.educationLevel == EducationLevel.HSC) {
      console.log("HSC");
      this.f.subjectScope.setValue(SubjectScope.JSC);
      this.f.subjectGroup.setValue(null);
      this.f.subjectType.setValue(null);
      this.subjectForm.get("subjectScope").disable();
      this.subjectForm.get("subjectGroup").enable();
      this.subjectForm.get("subjectType").enable();

    }
    else if (selectedLevel.educationLevel == EducationLevel.SSC) {
      console.log("SSC");
      this.f.subjectScope.setValue(SubjectScope.JSC);
      this.f.subjectGroup.setValue(null);
      this.f.subjectType.setValue(null);
      this.subjectForm.get("subjectScope").disable();
      this.subjectForm.get("subjectGroup").enable();
      this.subjectForm.get("subjectType").enable();

    }
    else {
      console.log("PSC");
      this.pscDisbaled = true;
      this.f.subjectScope.setValue(null);
      this.f.subjectGroup.setValue(SubjectGroup.General);
      this.f.subjectType.setValue(SubjectType.Compulsory);
      this.subjectForm.get("subjectScope").enable();
      this.subjectForm.get("subjectGroup").disable();
      this.subjectForm.get("subjectType").disable();

    }
    
  }
  onSubmit() {
    if (!this.subjectForm.valid) {
      return;
    }
    
    let data: Subject = new Subject( );
    data.subjectName = this.f.subjectName.value;
    data.subjectCode = this.f.subjectCode.value;
    data.classLevelId = this.f.classLevelId.value;
    data.subjectScope = this.f.subjectScope.value;
    data.subjectGroup = this.f.subjectGroup.value;
    data.subjectType = this.f.subjectType.value;
    this.subjectService.post(data)
      .subscribe(x => {
        this.notificationService.success("Data saved successfuly.", "DISMISS")
        this.subjectForm.reset({});
        this.subjectForm.markAsPristine();
      });
  }
  ngOnInit() {
    Object.keys(SubjectScope).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v, i) => {
      this.subjectScopeOptions.push({ name: v, value: SubjectScope[v] });
      });
    
    Object.keys(SubjectGroup).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v, i) => {
      this.subjectGroupOptions.push({ name: v, value: SubjectGroup[v] });
      });

    Object.keys(SubjectType).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v, i) => {
      this.subjectTypeOptions.push({ name: v, value: SubjectType[v] });
      });
    
    this.classLevelService.getActive()
      .subscribe(x => {
        this.activeLevels = x;
        //console.log(this.activeLevels);
      },
        err => {
          this.notificationService.success("Cannot load remote data.", "DISMISS");
          return throwError(err);
        });
  }

}
