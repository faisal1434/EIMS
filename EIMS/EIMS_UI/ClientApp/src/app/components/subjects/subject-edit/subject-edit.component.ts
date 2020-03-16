import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/data/subject.service';
import { ClassLevelService } from 'src/app/services/data/class-level.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'src/app/models/data/subject-model';
import { ClassLevel } from 'src/app/models/data/class-level-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { SubjectScope, SubjectGroup, SubjectType, EducationLevel } from 'src/app/models/common/constants-model';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent implements OnInit {

  subject: Subject;
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
    private subjectService: SubjectService,
    public classLevelService: ClassLevelService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute
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
  initForm() {
    this.subjectForm.setValue({
      subjectName: this.subject.subjectName,
      subjectCode: this.subject.subjectCode,
      classLevelId: this.subject.classLevelId,
      subjectScope: this.subject.subjectScope,
      subjectGroup: this.subject.subjectGroup,
      subjectType: this.subject.subjectType
    })
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


    this.subject.subjectName = this.f.subjectName.value;
    this.subject.subjectCode = this.f.subjectCode.value;
    this.subject.classLevelId = this.f.classLevelId.value;
    this.subject.subjectScope = this.f.subjectScope.value;
    this.subject.subjectGroup = this.f.subjectGroup.value;
    this.subject.subjectType = this.f.subjectType.value;
    this.subjectService.put(this.subject)
      .subscribe(x => {
        this.notificationService.success("Data saved successfuly.", "DISMISS")
        
        this.subjectForm.markAsPristine();
      });
  }
  ngOnInit() {
    let id = this.activatedRoute.snapshot.params.id;
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
    this.subjectService.getById(id)
      .subscribe(x => {
        this.subject = x;
        this.initForm();
      });
  }

}
