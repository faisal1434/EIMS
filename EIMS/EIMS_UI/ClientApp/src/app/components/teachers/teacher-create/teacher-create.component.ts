import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/data/teacher.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { DatePipe } from '@angular/common';
import { Designation } from 'src/app/models/data/designation-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { Teacher } from 'src/app/models/data/teacher-model';
import { throwError } from 'rxjs';
import { DesignationService } from 'src/app/services/data/designation.service';
import { BloodGroup, EmployeeType, EducationLevel, SubjectGroup, Gender } from 'src/app/models/common/constants-model';

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.css']
})
export class TeacherCreateComponent implements OnInit {

  /// Fileds
  ///******************************
  isLinear = true;
  designations: Designation[];
  bloodGroupOptions: any[] = [];
  //employeeTypeOptions: any[] = [];
  classLevelOptions: any[] = [];
  subjectGroupOptions: any[] = [];
  genderOptions: any[] = [];
  employeeDataForm: FormGroup = new FormGroup({
    employeeInfo: new FormGroup({
      employeeName: new FormControl('', Validators.required),
      //employeeType: new FormControl('', Validators.required),
      joinDate: new FormControl('', Validators.required),
      designationId: new FormControl('', Validators.required),
      classLevel: new FormControl('', Validators.required),
      subjectGroup: new FormControl('', Validators.required)
    }),
    personalInfo: new FormGroup({
      gender: new FormControl('', Validators.required),
      presentAddress: new FormControl('', Validators.required),
      permanentAddress: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
      
    }),
    pictureFileAttach: new FormGroup({
      picture: new FormControl('', Validators.required)
    })
  });
  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Save',
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
  selectedFile: File;
  /// Constructor
  ///*****************************
  constructor(
    private teacherService: TeacherService,
    private designationService: DesignationService,
    private notificationService: NotificationService,
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
    //this.selectedFile.name.substr(this.selectedFile.name.length - 10, 10);
    console.log(this.selectedFile);
    this.employeeDataForm.get('pictureFileAttach').get('picture').setValue(this.selectedFile.name);
    console.log(this.employeeDataForm.get('pictureFileAttach').get('picture').value);

  }
  removeImage() {
    this.selectedFile = null;
  }
  onSubmit() {
    console.log('post');
    if (!this.employeeDataForm.valid) return;
   
    let data = new Teacher();
    data.employeeName = this.employeeDataForm.get('employeeInfo').get('employeeName').value;
    //data.employeeType = this.employeeDataForm.get('employeeInfo').get('employeeType').value;
    data.designationId = this.employeeDataForm.get('employeeInfo').get('designationId').value;
    data.joinDate = this.datePipe.transform(this.employeeDataForm.get('employeeInfo').get('joinDate').value, 'yyyy-MM-dd');
    data.classLevel = this.employeeDataForm.get('employeeInfo').get('classLevel').value;
    data.subjectGroup = this.employeeDataForm.get('employeeInfo').get('subjectGroup').value;
    data.gender = this.employeeDataForm.get('personalInfo').get('gender').value;
    data.presentAddress = this.employeeDataForm.get('personalInfo').get('presentAddress').value;
    data.permanentAddress = this.employeeDataForm.get('personalInfo').get('permanentAddress').value;
    data.email = this.employeeDataForm.get('personalInfo').get('email').value;
    data.phone = this.employeeDataForm.get('personalInfo').get('phone').value;
    data.picture = this.selectedFile.name;//this.employeeDataForm.get('pictureFileAttach').get('picture').value;

    console.log("posting");
    console.log(data);
    this.teacherService.post(data)
      .subscribe(x => {
        console.log(x);
        const teacher: Teacher = x;
        this.uploadFile(teacher.employeeId);
      }, err => {
        this.notificationService.success("Failed to save data.", "DISMISS");
        
        return throwError(err);
      });
  }
  uploadFile(id: number) {
    console.log(id);
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      console.log('loaded');
      this.teacherService.uploadImage(id, this.selectedFile).subscribe(
        (res) => {
          console.log(res);
          this.notificationService.success("Data saved to database.", "DISMISS");
          this.employeeDataForm.reset({});
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
  /// Lifecycle
  ///*****************************
  ngOnInit() {
    //console.log(this.employeeDataForm.get('employeeInfo').get('employeeName'));

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
    //Object.keys(EmployeeType).filter(
    //  (type) => isNaN(<any>type) && type !== 'values'
    //).forEach((v, i) => {
    //  this.employeeTypeOptions.push({ name: v, value: EmployeeType[v] });
    //});
    Object.keys(EducationLevel).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v, i) => {
      this.classLevelOptions.push({ name: v, value: EducationLevel[v] });
      });
    Object.keys(SubjectGroup).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v, i) => {
      this.subjectGroupOptions.push({ name: v, value: SubjectGroup[v] });
      });
    Object.keys(Gender).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v, i) => {
      this.genderOptions.push({ name: v, value: Gender[v] });
    });
  }

}
