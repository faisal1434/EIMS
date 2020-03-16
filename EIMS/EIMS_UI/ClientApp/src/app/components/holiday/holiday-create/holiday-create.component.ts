import { Component, OnInit } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { HolidayService } from 'src/app/services/data/holiday.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { DatePipe } from '@angular/common';
import { HolidayType } from 'src/app/models/common/constants-model';
import { Holiday } from 'src/app/models/data/holiday-model';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-holiday-create',
  templateUrl: './holiday-create.component.html',
  styleUrls: ['./holiday-create.component.css']
})
export class HolidayCreateComponent implements OnInit {
  //defaultDutaion = 0;
 
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
  onSubmit() {
    if (!this.holidayForm.valid) return;
    this.spinnerButtonOptions.active = true;
    let data: Holiday = new Holiday();
    Object.assign(data, this.holidayForm.value);
    data.duration = this.holidayForm.get('duration').value;
    data.holidayDate = this.datePipe.transform(data.holidayDate, 'yyyy-MM-dd');
    console.log(data);
    this.holidayService.post(data)
      .subscribe(x => {
        this.notificationService.success("Data saved successfuly.", 'DISMISS');
        this.spinnerButtonOptions.active = false;
        this.holidayForm.reset({});
        this.holidayForm.markAsPristine();
      },
        err => {
          this.notificationService.success("Failed to save data.", 'DISMISS');
          this.spinnerButtonOptions.active = false;
          return throwError(err);
        });
  }
  ngOnInit() {
    Object.keys(HolidayType).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v, i) => this.holidayTypeOptions.push({ name: v, value: HolidayType[v] }));
  }

}
