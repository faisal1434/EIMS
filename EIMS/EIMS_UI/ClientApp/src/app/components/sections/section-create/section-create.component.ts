import { Component, OnInit } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { SubjectGroup, EducationLevel } from 'src/app/models/common/constants-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AcademicClassService } from 'src/app/services/data/academic-class.service';
import { AcademicClass } from 'src/app/models/data/academic-class-model';
import { SectionService } from 'src/app/services/data/section.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { Section } from 'src/app/models/data/section-model';

@Component({
  selector: 'app-section-create',
  templateUrl: './section-create.component.html',
  styleUrls: ['./section-create.component.css']
})
export class SectionCreateComponent implements OnInit {
  notSSCorJSC = false;
  subjectGroupOptions: any[] = [];
  classList: AcademicClass[];
  sectionForm: FormGroup = new FormGroup({
    sectionName: new FormControl('', Validators.required),
    subjectGroup: new FormControl('', Validators.required),
    academicClassId: new FormControl('', Validators.required)
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
      fontIcon: 'save_alt'
    }
  };
  constructor(
    private academicClassService: AcademicClassService,
    private sectionService: SectionService,
    private notificationServcie: NotificationService
  ) { }
  get f() {
    return this.sectionForm.controls;
  }
  onChange(value) {
    if (value == null) return;
    let c: AcademicClass = this.classList.find(v => v.academicClassId == value);
    if (c.classLevelId == EducationLevel.JSC || c.classLevelId == EducationLevel.PSC) {
      this.notSSCorJSC = false
    }
    else {
      this.notSSCorJSC = true;
    }
  }
  getDisbaled(v) {
    if (v == SubjectGroup.General) return this.notSSCorJSC;
    else return !this.notSSCorJSC;
  }
  onSubmit() {
    if (!this.sectionForm.valid) return;
    this.spinnerButtonOptions.active = true;
    let data: Section = new Section();
    data.sectionName = this.f.sectionName.value;
    data.academicClassId = this.f.academicClassId.value;
    data.subjectGroup = this.f.subjectGroup.value;
    this.sectionService.post(data)
      .subscribe(x => {
        this.notificationServcie.success("Data saved successfuly.", "DISMISS");
        this.sectionForm.reset({});
        this.sectionForm.markAsPristine();
        this.spinnerButtonOptions.active = false;
      }, err => {
          this.notificationServcie.success("Falied to save data.", "DISMISS");
          this.spinnerButtonOptions.active = false;
      });
  }
  ngOnInit() {
    this.academicClassService.getRunnig()
      .subscribe(x => {
        this.classList = x;
      }, err => {
          this.notificationServcie.success("Falied to load class list.", "DISMISS");
      })
    Object.keys(SubjectGroup).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v, i) => {
      this.subjectGroupOptions.push({ name: v, value: SubjectGroup[v] });
    });

  }

}
