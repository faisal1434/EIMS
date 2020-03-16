import { Component, OnInit } from '@angular/core';
import { BloodGroup } from 'src/app/models/common/constants-model';
import { BloodGroupName } from 'src/app/models/common/blood-group-name-model';
import { SectionService } from 'src/app/services/data/section.service';
import { Section } from 'src/app/models/data/section-model';
import { NotificationService } from 'src/app/services/common/notification.service';
import { DatePipe } from '@angular/common';
import { throwError } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Gender } from 'src/app/models/common/contants-model';
import { StudentService } from 'src/app/services/data/student.service';
import { Student } from 'src/app/models/data/student-model';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
  isLinear = true;
  sections: Section[];
  bloodGroupOptions: any[] = [];
  genderOptions: any[] = [];
  studentDataForm: FormGroup = new FormGroup({
    studentInfo: new FormGroup({
      studentName: new FormControl('', Validators.required),
      roll: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      bloodGroup: new FormControl('', Validators.required),
      sectionId: new FormControl('', Validators.required)
    }),
    parentalInfo: new FormGroup({
      fatherName: new FormControl('', Validators.required),
      motherName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required)
    }),
    pictureFileAttach: new FormGroup({
      picture: new FormControl('', Validators.required)
    })
  });
  selectedFile: File;
  constructor(
    private studentService: StudentService,
    private sectionService: SectionService,
    private notificationService: NotificationService,
    private datePipe: DatePipe
  ) { }
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    //this.selectedFile.name.substr(this.selectedFile.name.length - 10, 10);
    console.log(this.selectedFile);
    this.studentDataForm.get('pictureFileAttach').get('picture').setValue(this.selectedFile.name);
    console.log(this.studentDataForm.get('pictureFileAttach').get('picture').value);

  }
  removeImage() {
    this.selectedFile = null;
  }
  onSubmit() {
    if (!this.studentDataForm.valid) return;
    if (!this.selectedFile) return;
    console.log(this.studentDataForm.value);
    let data = new Student();
    data.studentName = this.studentDataForm.get('studentInfo').get('studentName').value;
    data.bloodGroup = this.studentDataForm.get('studentInfo').get('bloodGroup').value;
    data.roll = this.studentDataForm.get('studentInfo').get('roll').value;
    data.birthDate = this.datePipe.transform(this.studentDataForm.get('studentInfo').get('birthDate').value, 'yyyy-MM-dd');
    data.gender = this.studentDataForm.get('studentInfo').get('gender').value;
    data.sectionId = this.studentDataForm.get('studentInfo').get('sectionId').value;
    

    data.fatherName = this.studentDataForm.get('parentalInfo').get('fatherName').value;
    data.motherName = this.studentDataForm.get('parentalInfo').get('motherName').value;
    data.email = this.studentDataForm.get('parentalInfo').get('email').value;
    data.phone = this.studentDataForm.get('parentalInfo').get('phone').value;
    data.address = this.studentDataForm.get('parentalInfo').get('address').value;
    data.picture = this.selectedFile.name;//this.studentDataForm.get('pictureFileAttach').get('picture').value;
    console.log(data);
    this.studentService.post(data)
      .subscribe(x => {
        console.log(x);
        const student: Student = x;
        this.uploadFile(student.studentId);
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
      this.studentService.uploadImage(id, this.selectedFile).subscribe(
        (res) => {
          console.log(res);
          this.notificationService.success("Data saved to database.", "DISMISS");
          this.studentDataForm.reset({});
          this.studentDataForm.markAsPristine();


        },
        (err) => {
          console.log(err);
          this.notificationService.success("Failed to upload picture.", "DISMISS");

          return throwError(err);
        })
    });
    reader.readAsDataURL(this.selectedFile);
  }
  ngOnInit() {
    this.sectionService.getEx()
      .subscribe(x => {
        this.sections = x;
        console.log(this.sections);
      }, err => {
        this.notificationService.success("Cannot load class section list.", "DISMISS");
        return throwError(err);
      });
    Object.keys(BloodGroup).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v, i) => {
      this.bloodGroupOptions.push({ name: BloodGroupName[v], value: BloodGroup[v]});
      });
    Object.keys(Gender).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v, i) => {
      this.genderOptions.push({ name: v, value: Gender[v] });
    });
    //console.log(this.bloodGroupOptions);
  }

}
