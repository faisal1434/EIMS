import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { WeekDay, DatePipe } from '@angular/common';
import { BusinessDayService } from 'src/app/services/data/business-day.service';
import { BusinessDay } from 'src/app/models/data/business-day-model';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { NotificationService } from 'src/app/services/common/notification.service';
import { throwError } from 'rxjs';
import { ClassType, ShiftType, EducationLevel, SessionStatus } from 'src/app/models/common/constants-model';
import { ClassDuration } from 'src/app/models/data/class-duration-model';
import { ClassDurationService } from 'src/app/services/data/class-duration.service';
import { ShiftService } from 'src/app/services/data/shift.service';
import { ShiftViewModel } from 'src/app/models/view-models/shift-view-model';
import { ClassLevel } from 'src/app/models/data/class-level-model';
import { ClassLevelService } from 'src/app/services/data/class-level.service';
import { AcademicInfoService } from 'src/app/services/data/academic-info.service';
import { AcademicSessionService } from 'src/app/services/data/academic-session.service';
import { AcademicSession } from 'src/app/models/data/academic-session';
import { DesignationService } from 'src/app/services/data/designation.service';
import { Designation } from 'src/app/models/data/designation-model';

@Component({
  selector: 'app-master-settings',
  templateUrl: './master-settings.component.html',
  styleUrls: ['./master-settings.component.css']
})
export class MasterSettingsComponent implements OnInit {
  //businessDayForm: FormGroup;
  
  formTemplate: { id: number, label: string, value: number, checked: boolean }[] = [];
  businessDays: BusinessDay[];
  businessDayButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Save',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    disabled: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    mode: 'indeterminate',
    buttonIcon: {
      fontIcon:'save_alt'
    }
  };
  //ClassDuration
  classTypeOptions: any[] = [];
  classDurations: ClassDuration[];
  //Shift
  shiftTypeOptions: any[] = [];
  shiftVMs: ShiftViewModel[] = [];
  shiftFormError = '';
  //Active Education Level
  //educationLevelOptions: any[] = [];
  classLevels: ClassLevel[];
  //Academic Sessions
  academicSessions: AcademicSession[];
  sessionFormTemplate: { sesssionName?: string, startDate?: Date | string, endDate?: Date | string, sessionStatus?: SessionStatus } = {};
  sessionStatusOptions: any[] = [];
  //Designations
  designations: Designation[];
  designation: Designation = new Designation();
  constructor(
    private businessDayService: BusinessDayService,
    private classDurationService: ClassDurationService,
    private shiftService: ShiftService,
    private classLevelService: ClassLevelService,
    private academicSessionService: AcademicSessionService,
    private designationService: DesignationService,
    private notificationService: NotificationService,
    private datePipe: DatePipe
  ) {
    
  }
  onBusinessDaySubmit(f: NgForm) {
    //console.log(f.controls.Sunday.value);
    //console.log(this.formTemplate);
    //console.log(this.businessDays);
    this.businessDayButtonOptions.active = true;
    this.businessDays = [];
    this.formTemplate.forEach(t => {
      let b = new BusinessDay();
      b.weekday = t.value;
      b.isOn = t.checked;
      this.businessDays.push(b);

    });
    console.log(this.businessDays);
    this.businessDayService.postArray(this.businessDays)
      .subscribe(x => {
        this.notificationService.success("Settings updated successfuly.", "DISMISS");
        this.businessDayButtonOptions.active = false;
      },
        err => {
          this.notificationService.success("Settings not updated.", "DISMISS");
          this.businessDayButtonOptions.active = false;
          return throwError(err);
        });
  }
  onSubmitDurationForm(f: NgForm) {
    //console.log(f.value);
    //console.log(this.classTypeOptions);
    this.businessDayButtonOptions.active = true;
    let data: ClassDuration[] = [];
    this.classTypeOptions.forEach(c => {
      let d = new ClassDuration();
      d.classType = c.value;
      d.duration = c.duration;
      data.push(d);
    });
    this.classDurationService.postArray(data)
      .subscribe(x => {
        this.classDurations = x;
        this.classDurations.forEach(d => {
          let o = this.classTypeOptions.find(p => p.value == d.classType);
          o.duration = d.duration;
          this.notificationService.success("Saved successfuly", "DISMISS");
          this.businessDayButtonOptions.active = false;
        });
      });
  }
  onSubmitShiftForm(f: NgForm) {
    //console.log(f.value);
    console.log(this.shiftTypeOptions);
    let ok = this.shiftTypeOptions.filter(x => x.active === true).length != 0;
    if (!ok) {
      this.shiftFormError = "You must have at least one shift active."
    }
    else {
      this.shiftFormError = '';
    }
    ok = this.shiftTypeOptions.filter(x => x.active === true && (x.startTime === '' || x.endTime === '')).length == 0;
    if (!ok) {
      this.shiftFormError = "Start and end time required for active shift."
    }
    else {
      this.shiftFormError = '';
    }
    if (!ok) return;
    let data: any[] = [];
    this.shiftTypeOptions.forEach(x => {
      //x.startTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd') + ' ' + x.startTime;
      data.push({
        shiftType: x.value,
        startTime: x.startTime == '' ? this.datePipe.transform(new Date(), 'yyyy-MM-dd') : this.datePipe.transform(new Date(), 'yyyy-MM-dd') + ' ' + x.startTime,
        endTime: x.endTime == '' ? this.datePipe.transform(new Date(), 'yyyy-MM-dd') : this.datePipe.transform(new Date(), 'yyyy-MM-dd') + ' ' + x.endTime,
        active:x.active
      })
    });
    console.log(data);
    this.shiftService.postArray(data)
      .subscribe(x => this.shiftVMs = x);
  }
  fetchClassDurations() {
    this.classDurationService.get()
      .subscribe(x => {
        this.classDurations = x;
        this.classDurations.forEach(d => {
          let o = this.classTypeOptions.find(p => p.value == d.classType);
          o.duration = d.duration;
        });
      });
  }
  fetchShifts() {
    this.shiftService.getV1()
      .subscribe(x => {
        this.shiftVMs = x;
        
        this.shiftVMs.forEach(s => {
          let t = this.shiftTypeOptions.find(o => o.value == s.shiftType);
          let st = this.datePipe.transform(s.startTime, 'hh:mm a');
          let se = this.datePipe.transform(s.endTime, 'hh:mm a');
          t.startTime = st=='12:00 AM' ? '': st;
          t.endTime = se == '12:00 AM' ? '' : se;
          t.active = s.active;
          console.log(t);
        });
        console.log(this.shiftVMs);
        console.log(this.shiftTypeOptions);
      });
    
  }
  fetchClassLevels() {
    this.classLevelService.get()
      .subscribe(x => {
        this.classLevels = x;
        console.log(this.classLevels);
      });
  }
  fetchAcademicSessions() {
    this.academicSessionService.get()
      .subscribe(x => {
        this.academicSessions = x;

      });
  }
  getEducationLevelName(v: number): string {
    return EducationLevel[v];
  }
  getSessionStatuName(v: number): string {
    return SessionStatus[v];
  }
  onEducationLevelSubmit(f: NgForm) {
    console.log(this.classLevels);
    this.classLevelService.postArray(this.classLevels)
      .subscribe(x => {
        this.notificationService.success("Database updated successfuly.", "DISMISS");

      },
        err => {
          this.notificationService.success("Failed to update database.", "DISMISS");
          return throwError(err);
        });
  }
  onSessionSubmit(f: NgForm) {
    if (!f.valid) return;
    
    this.sessionFormTemplate.startDate = this.datePipe.transform(this.sessionFormTemplate.startDate, 'yyyy-MM-dd');
    this.sessionFormTemplate.endDate = this.datePipe.transform(this.sessionFormTemplate.endDate, 'yyyy-MM-dd');
    
    this.academicSessionService.post(<AcademicSession>this.sessionFormTemplate)
      .subscribe(x => {
        this.notificationService.success("Data saved.", "DISMISS");
        this.sessionFormTemplate = {};
        f.resetForm({});
        this.fetchAcademicSessions();
      })
  }
  deleteSession(s: AcademicSession) {
    this.academicSessionService.delete(s.academicSessionId)
      .subscribe(x => {
        this.fetchAcademicSessions();
      });
  }
  onPostSbmit(f: NgForm) {
    console.log(this.designation);
    this.designationService.post(this.designation)
      .subscribe(x => {
        this.designations.push(x);
        this.designation = new Designation();
        f.resetForm({});
        
      });
  }
  deleteDesignation(d: Designation) {
    this.designationService.delete(d)
      .subscribe(x => {
        let i = this.designations.findIndex(item => item.designationId == d.designationId);
        this.designations.splice(i, 1);
      })
  }
  ngOnInit() {
   
    Object.keys(WeekDay).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v, i) => {
      this.formTemplate.push({id:null, label: v, value: WeekDay[v], checked: false });
      });
    //let group = {};
    
    this.businessDayService.get()
      .subscribe(x => {
        this.businessDays = x;
        this.businessDays.forEach(b => {
          let d = this.formTemplate.find(t => t.value == b.weekday);
          d.id = b.businessDayId;
          d.checked = b.isOn;
        });
      });
    //console.log(this.formTemplate);
    Object.keys(ClassType).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v, i) => this.classTypeOptions.push({ name: v, value: ClassType[v], duration:0 }));
    this.fetchClassDurations();
    //////////////////////////////////////////////////////
    Object.keys(ShiftType).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v, i) => this.shiftTypeOptions.push({ name: v, value: ShiftType[v], label: v + '_' + ShiftType[v], startTime: '', endTime: '', active: false }));
    this.fetchShifts();
    ////////////////////////////////////////////////////////
    
    this.fetchClassLevels();
    ////////////////////////////////////
    this.fetchAcademicSessions();
    Object.keys(SessionStatus).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v, i) => this.sessionStatusOptions.push({ name: v, value: SessionStatus[v], checked: false }));
    ///////////////////////////////////////////////
    this.designationService.get()
      .subscribe(x => {
        this.designations = x;
      });
  }
  
}
