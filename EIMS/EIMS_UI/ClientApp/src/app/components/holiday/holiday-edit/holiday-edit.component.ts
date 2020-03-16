import { Component, OnInit } from '@angular/core';
import { HolidayService } from 'src/app/services/data/holiday.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HolidayType } from 'src/app/models/common/constants-model';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Holiday } from 'src/app/models/data/holiday-model';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-holiday-edit',
  templateUrl: './holiday-edit.component.html',
  styleUrls: ['./holiday-edit.component.css']
})
export class HolidayEditComponent implements OnInit {
  holiday: Holiday;
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
  holidayTypeOptions: any[] = [];
  holidayForm: FormGroup = new FormGroup({
    holidayType: new FormControl('', Validators.required),
    holidayDate: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });
  constructor(
    private holidayService: HolidayService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) { }
  get f() {
    return this.holidayForm.controls;
  }
  onSelectionChange(value) {
    console.log(value);
    if (value == HolidayType.VACATION) {

      this.f.duration.setValue(null);
      this.holidayForm.get("duration").enable();
    }
    else {
      this.f.duration.setValue(1);
      this.holidayForm.get("duration").disable();
    }
  }
  initForm() {
    this.holidayForm.setValue({
      holidayType: this.holiday.holidayType,
      holidayDate: this.holiday.holidayDate,
      duration: this.holiday.duration,
      description: this.holiday.description
    });
  }
  onSubmit() {
    if (!this.holidayForm.valid) return;
    this.spinnerButtonOptions.active = true;
    let data: Holiday = new Holiday();
    Object.assign(data, this.holidayForm.value);
    data.holidayId = this.holiday.holidayId;
    data.duration = this.holidayForm.get('duration').value;
    data.holidayDate = this.datePipe.transform(data.holidayDate, 'yyyy-MM-dd');
    console.log(data);
    this.holidayService.put(data)
      .subscribe(x => {
        this.notificationService.success("Data saved successfuly.", 'DISMISS');
        this.spinnerButtonOptions.active = false;
        
        this.holidayForm.markAsPristine();
      },
        err => {
          this.notificationService.success("Failed to save data.", 'DISMISS');
          this.spinnerButtonOptions.active = false;
          return throwError(err);
        });
  }
  ngOnInit() {
    let id = this.activatedRoute.snapshot.params.id;
    this.holidayService.getById(id)
      .subscribe(x => {
        this.holiday = x;
        this.initForm();
      }, err => {
        this.notificationService.success("Failed to load remote data.", "DISMISS");
        return throwError(err);
      });
    Object.keys(HolidayType).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v, i) => this.holidayTypeOptions.push({ name: v, value: HolidayType[v] }));
  
  }

}
