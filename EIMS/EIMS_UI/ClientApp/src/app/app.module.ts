import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MaterialModule } from './shared/material/material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { AuthenticationService } from './services/common/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AcademicInfoService } from './services/data/academic-info.service';
import { HomeComponent } from './components/home/home.component';
import { NotificationService } from './services/common/notification.service';
import { InstituteInfoEditComponent } from './components/home/edit/institute-info-edit.component';
import { JwtInterceptor } from './providers/interceptors/jwt-interceptor';
import { HttpErrorInterceptor } from './providers/interceptors/http-error-interceptor';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { DatePipe } from '@angular/common';
import { MasterSettingsComponent } from './components/master-settings/master-settings.component';
import { BusinessDayService } from './services/data/business-day.service';
import { ClassDurationService } from './services/data/class-duration.service';
import { ShiftService } from './services/data/shift.service';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ClassPeriodViewComponent } from './components/periods/class-period-view/class-period-view.component';
import { ClassPeriodService } from './services/data/class-period.service';
import { ClassLevelService } from './services/data/class-level.service';
import { RoomService } from './services/data/room.service';
import { RoomViewComponent } from './components/rooms/room-view/room-view.component';
import { RoomCreateComponent } from './components/rooms/room-create/room-create.component';
import { RoomEditComponent } from './components/rooms/room-edit/room-edit.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { AcademicSessionService } from './services/data/academic-session.service';
import { AcademicClassService } from './services/data/academic-class.service';
import { AcademicClassViewComponent } from './components/academic-class/academic-class-view/academic-class-view.component';
import { AcademicClassCreateComponent } from './components/academic-class/academic-class-create/academic-class-create.component';
import { AcademicClassEditComponent } from './components/academic-class/academic-class-edit/academic-class-edit.component';
import { CustomErrorHandler } from './handlers/custom-error-handler';
import { SubjectViewComponent } from './components/subjects/subject-view/subject-view.component';
import { SubjectCreateComponent } from './components/subjects/subject-create/subject-create.component';
import { SubjectEditComponent } from './components/subjects/subject-edit/subject-edit.component';
import { SubjectService } from './services/data/subject.service';
import { EmployeeService } from './services/data/employee.service';
import { EmployeeViewComponent } from './components/employees/employee-view/employee-view.component';
import { EmployeeEditComponent } from './components/employees/employee-edit/employee-edit.component';
import { EmployeeCreateComponent } from './components/employees/employee-create/employee-create.component';
import { EventCalendarComponent } from './components/calendar/event-calendar/event-calendar.component';
import { HolidayViewComponent } from './components/holiday/holiday-view/holiday-view.component';
import { HolidayCreateComponent } from './components/holiday/holiday-create/holiday-create.component';
import { HolidayEditComponent } from './components/holiday/holiday-edit/holiday-edit.component';
import { HolidayService } from './services/data/holiday.service';
import { TeacherService } from './services/data/teacher.service';
import { TeacherViewComponent } from './components/teachers/teacher-view/teacher-view.component';
import { TeacherCreateComponent } from './components/teachers/teacher-create/teacher-create.component';
import { TeacherEditComponent } from './components/teachers/teacher-edit/teacher-edit.component';
import { TeacherProfileComponent } from './components/teachers/teacher-profile/teacher-profile.component';
import { QualificationViewActionComponent } from './components/qualifications/qualification-view-action/qualification-view-action.component';
import { QualificationService } from './services/data/qualification.service';
import { SectionViewComponent } from './components/sections/section-view/section-view.component';
import { SectionEditComponent } from './components/sections/section-edit/section-edit.component';
import { SectionCreateComponent } from './components/sections/section-create/section-create.component';
import { SectionService } from './services/data/section.service';
import { StudentService } from './services/data/student.service';
import { StudentViewComponent } from './components/students/student-view/student-view.component';
import { StudentEditComponent } from './components/students/student-edit/student-edit.component';
import { StudentCreateComponent } from './components/students/student-create/student-create.component';
import { StudentProfileComponent } from './components/students/student-profile/student-profile.component';
import { TeacherSubjectComponent } from './components/teachers/teacher-subject/teacher-subject.component';
import { TeacherSubjectService } from './services/data/teacher-subject.service';
import { TeacherSubjectEditComponent } from './components/teachers/teacher-subject-edit/teacher-subject-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomeComponent,
    InstituteInfoEditComponent,
    LoginComponent,
    MasterSettingsComponent,
    ClassPeriodViewComponent,
    RoomViewComponent,
    RoomCreateComponent,
    RoomEditComponent,
    DeleteDialogComponent,
    AcademicClassViewComponent,
    AcademicClassCreateComponent,
    AcademicClassEditComponent,
    SubjectViewComponent,
    SubjectCreateComponent,
    SubjectEditComponent,
    EmployeeViewComponent,
    EmployeeEditComponent,
    EmployeeCreateComponent,
    EventCalendarComponent,
    HolidayViewComponent,
    HolidayCreateComponent,
    HolidayEditComponent,
    TeacherViewComponent,
    TeacherCreateComponent,
    TeacherEditComponent,
    TeacherProfileComponent,
    QualificationViewActionComponent,
    SectionViewComponent,
    SectionEditComponent,
    SectionCreateComponent,
    StudentViewComponent,
    StudentEditComponent,
    StudentCreateComponent,
    StudentProfileComponent,
    TeacherSubjectComponent,
    TeacherSubjectEditComponent
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatProgressButtonsModule,
    NgMaterialMultilevelMenuModule,
    NgxMaterialTimepickerModule
  ],
  entryComponents: [DeleteDialogComponent],
  providers: [
    AuthenticationService,
    AcademicInfoService,
    NotificationService,
    BusinessDayService,
    ClassDurationService,
    ShiftService,
    ClassPeriodService,
    ClassLevelService,
    RoomService,
    AcademicSessionService,
    AcademicClassService,
    SubjectService,
    EmployeeService,
    HolidayService,
    TeacherService,
    QualificationService,
    SectionService,
    StudentService,
    TeacherSubjectService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: CustomErrorHandler }
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
