import { Component, OnInit } from '@angular/core';
import { InstituteInfo } from 'src/app/models/data/institute-info-model';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InstituteInfoService } from 'src/app/services/data/institute-info.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-institute-info-edit',
  templateUrl: './institute-info-edit.component.html',
  styleUrls: ['./institute-info-edit.component.css']
})
export class InstituteInfoEditComponent implements OnInit {
  //Fields
  intituteInfo: InstituteInfo;
  error = '';
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
  intituteInfoForm: FormGroup = new FormGroup({

    instituteName: new FormControl('', Validators.required),
    instituteSlogan: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    established: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    founderName: new FormControl('', Validators.required),
    principalName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });
  constructor(
    private instituteInfoSvc: InstituteInfoService,
    private notifationService: NotificationService,
    private datePipe: DatePipe,
    private router: Router,
    private actvatedRoute: ActivatedRoute
  ) { }
  get f() {
    return this.intituteInfoForm.controls;
  }
  initializeFormGroup() {
    this.intituteInfoForm.setValue({

      instituteName: this.intituteInfo.instituteName,
      instituteSlogan: this.intituteInfo.instituteSlogan,
      description: this.intituteInfo.description,
      established: this.intituteInfo.established,
      address: this.intituteInfo.address,
      founderName: this.intituteInfo.founderName,
      principalName: this.intituteInfo.principalName,
      phone: this.intituteInfo.phone,
      email: this.intituteInfo.email
    });
  }
  onSubmit() {

    if (!this.intituteInfoForm.valid) return;
    console.log(this.intituteInfo);
    this.spinnerButtonOptions.active = true;
    this.intituteInfo.established = this.datePipe.transform(this.intituteInfo.established, 'yyyy-MM-dd');
    this.instituteInfoSvc.put(this.intituteInfo.instituteInfoId, this.intituteInfo)
      .subscribe(x => {
        this.notifationService.success("Data updated.", "DISMISS");
        this.initializeFormGroup();
        this.spinnerButtonOptions.active = false;
      },
        err => {
          this.notifationService.success("Failed to update", "DISMISS")
          this.spinnerButtonOptions.active = false;
        });

  }
  ngOnInit() {
    this.instituteInfoSvc.getById(this.actvatedRoute.snapshot.params.id)
      .subscribe(x => {
        this.intituteInfo = x;
        this.initializeFormGroup();
      });
  }


}
