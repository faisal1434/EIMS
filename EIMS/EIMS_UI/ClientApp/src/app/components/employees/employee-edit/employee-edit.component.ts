import { Component, OnInit } from '@angular/core';
import { Designation } from 'src/app/models/data/designation-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { EmployeeService } from 'src/app/services/data/employee.service';
import { DesignationService } from 'src/app/services/data/designation.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { DatePipe } from '@angular/common';
import { Employee } from 'src/app/models/data/employee-model';
import { throwError } from 'rxjs';
import { BloodGroup, EmployeeType } from 'src/app/models/common/constants-model';
import { ActivatedRoute } from '@angular/router';
import { ApiConfig } from 'src/app/configuration/api-config';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  imageBaseUrl = ApiConfig.apiBaseUrl;
  employee: Employee;
  isLinear = true;
  designations: Designation[];
  bloodGroupOptions: any[] = [];
  employeeTypeOptions: any[] = [];
  employeeDataForm: FormGroup = new FormGroup({
    employeeInfo: new FormGroup({
      employeeName: new FormControl('', Validators.required),
      employeeType: new FormControl('', Validators.required),
      joinDate: new FormControl('', Validators.required),
      designationId: new FormControl('', Validators.required)
    }),
    personalInfo: new FormGroup({
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      presentAddress: new FormControl('', Validators.required),
      permanentAddress: new FormControl('', Validators.required)
    }),
    pictureFileAttach: new FormGroup({
      picture: new FormControl('', Validators.required)
    })
  });
  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Save',
    spinnerSize: 18,
    raised: false,
    stroked: true,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
    buttonIcon: {
      fontIcon: 'save_alt'
    }
  };
  selectedFile: File;
  /// Constructor
  ///*****************************
  constructor(
    private employeeService: EmployeeService,
    private designationService: DesignationService,
    private notificationService: NotificationService,
    private activatedRoute:ActivatedRoute,
    private datePipe: DatePipe
  ) { }
  /// Properties
  ///*****************************
  //get fDetails() {
  // // return this.employeeDataForm.get('employeeInfo').controls;
  //}
  ///
  // Methods
  ///******************************
  ///
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this.selectedFile.name.substr(this.selectedFile.name.length - 10, 10);
    console.log(this.selectedFile);

  }
  removeImage() {
    this.selectedFile = null;
  }
  onSubmit() {
    console.log("submit");
    if (!this.employeeDataForm.valid) return;
    this.spinnerButtonOptions.active = true;
    let data = new Employee();
    data.employeeId = this.employee.employeeId
    data.employeeName = this.employeeDataForm.get('employeeInfo').get('employeeName').value;
    data.employeeType = this.employeeDataForm.get('employeeInfo').get('employeeType').value;
    data.designationId = this.employeeDataForm.get('employeeInfo').get('designationId').value;
    data.joinDate = this.datePipe.transform(this.employeeDataForm.get('employeeInfo').get('joinDate').value, 'yyyy-MM-dd');
    data.presentAddress = this.employeeDataForm.get('personalInfo').get('presentAddress').value;
    data.permanentAddress = this.employeeDataForm.get('personalInfo').get('permanentAddress').value;
    data.email = this.employeeDataForm.get('personalInfo').get('email').value;
    data.phone = this.employeeDataForm.get('personalInfo').get('phone').value;
    data.email = this.employeeDataForm.get('personalInfo').get('email').value;
    data.picture = this.selectedFile ? this.selectedFile.name : this.employee.picture;//this.employeeDataForm.get('pictureFileAttach').get('picture').value;

    console.log("posting");
    this.employeeService.put(data)
      .subscribe(x => {
        console.log(x);
        const emp: Employee = x;
        if (this.selectedFile)
          this.uploadFile(this.employee.employeeId);
        else {
          this.notificationService.success("Data saved to database.", "DISMISS");
          //this.employeeDataForm.reset({});
          this.selectedFile = null;
          this.employeeDataForm.markAsPristine();
          
        }
      }, err => {
        this.notificationService.success("Failed to save data.", "DISMISS");
        
        return throwError(err);
      });
  }
  uploadFile(id: number) {
   // console.log(id);
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      console.log('loaded');
      this.employeeService.uploadImage(id, this.selectedFile).subscribe(
        (res) => {
          console.log(res);
          this.notificationService.success("Data saved to database.", "DISMISS");
          this.employee.picture = res.imagePath;
          //this.employeeDataForm.reset({});
          this.employeeDataForm.markAsPristine();
          

        },
        (err) => {
          console.log(err);
          this.notificationService.success("Failed to upload picture.", "DISMISS");
          
          return throwError(err);
        })
    });
    reader.readAsDataURL(this.selectedFile);
  }
  initForm() {
    this.employeeDataForm.get('employeeInfo').setValue({
      employeeName: this.employee.employeeName,
      employeeType: this.employee.employeeType,
      joinDate: this.employee.joinDate,
      designationId: this.employee.designationId
    });
    this.employeeDataForm.get('personalInfo').setValue({
      email: this.employee.email,
      phone: this.employee.phone,
      presentAddress: this.employee.presentAddress,
      permanentAddress: this.employee.permanentAddress
    });
    this.employeeDataForm.get('pictureFileAttach').setValue({
      picture: this.employee.picture
      
    });
  }
  /// Lifecycle
  ///*****************************
  ngOnInit() {
    //console.log(this.employeeDataForm.get('employeeInfo').get('employeeName'));
    let id = this.activatedRoute.snapshot.params.id;
    this.employeeService.getById(id)
      .subscribe(x => {
        this.employee = x;
        console.log(this.employee);
        this.initForm();
      })
    this.designationService.get()
      .subscribe(x => {
        this.designations = x;
        console.log(this.designations);
      }, err => {
        this.notificationService.success('Cannot load remote data.', 'DISMISS');
        return throwError(err);
      });
    Object.keys(BloodGroup).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v, i) => {
      this.bloodGroupOptions.push({ name: v, value: BloodGroup[v] });
    });
    Object.keys(EmployeeType).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v, i) => {
      this.employeeTypeOptions.push({ name: v, value: EmployeeType[v] });
    });
  }

}
