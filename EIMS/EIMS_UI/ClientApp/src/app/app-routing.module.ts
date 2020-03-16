import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './providers/guards/auth-guard';
import { Role } from './models/common/role-model';
import { InstituteInfoEditComponent } from './components/home/edit/institute-info-edit.component';
import { LoginComponent } from './components/login/login.component';
import { MasterSettingsComponent } from './components/master-settings/master-settings.component';
import { ClassPeriodViewComponent } from './components/periods/class-period-view/class-period-view.component';
import { RoomViewComponent } from './components/rooms/room-view/room-view.component';
import { RoomCreateComponent } from './components/rooms/room-create/room-create.component';
import { RoomEditComponent } from './components/rooms/room-edit/room-edit.component';
import { AcademicClassViewComponent } from './components/academic-class/academic-class-view/academic-class-view.component';
import { AcademicClassCreateComponent } from './components/academic-class/academic-class-create/academic-class-create.component';
import { AcademicClassEditComponent } from './components/academic-class/academic-class-edit/academic-class-edit.component';
import { SubjectViewComponent } from './components/subjects/subject-view/subject-view.component';
import { SubjectCreateComponent } from './components/subjects/subject-create/subject-create.component';
import { SubjectEditComponent } from './components/subjects/subject-edit/subject-edit.component';
import { EmployeeViewComponent } from './components/employees/employee-view/employee-view.component';
import { EmployeeCreateComponent } from './components/employees/employee-create/employee-create.component';
import { EmployeeEditComponent } from './components/employees/employee-edit/employee-edit.component';
import { EventCalendarComponent } from './components/calendar/event-calendar/event-calendar.component';
import { HolidayViewComponent } from './components/holiday/holiday-view/holiday-view.component';
import { HolidayCreateComponent } from './components/holiday/holiday-create/holiday-create.component';
import { HolidayEditComponent } from './components/holiday/holiday-edit/holiday-edit.component';
import { TeacherViewComponent } from './components/teachers/teacher-view/teacher-view.component';
import { TeacherCreateComponent } from './components/teachers/teacher-create/teacher-create.component';
import { TeacherEditComponent } from './components/teachers/teacher-edit/teacher-edit.component';
import { TeacherProfileComponent } from './components/teachers/teacher-profile/teacher-profile.component';
import { QualificationViewActionComponent } from './components/qualifications/qualification-view-action/qualification-view-action.component';
import { SectionViewComponent } from './components/sections/section-view/section-view.component';
import { SectionCreateComponent } from './components/sections/section-create/section-create.component';
import { SectionEditComponent } from './components/sections/section-edit/section-edit.component';
import { StudentViewComponent } from './components/students/student-view/student-view.component';
import { StudentCreateComponent } from './components/students/student-create/student-create.component';
import { StudentEditComponent } from './components/students/student-edit/student-edit.component';
import { StudentProfileComponent } from './components/students/student-profile/student-profile.component';
import { TeacherSubjectComponent } from './components/teachers/teacher-subject/teacher-subject.component';
import { TeacherSubjectEditComponent } from './components/teachers/teacher-subject-edit/teacher-subject-edit.component';




const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: MasterSettingsComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }  },
  { path: 'institute-info-edit/:id', component: InstituteInfoEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'class-periods', component: ClassPeriodViewComponent },
  { path: 'rooms', component: RoomViewComponent },
  { path: 'room-create', component: RoomCreateComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'room-edit/:id', component: RoomEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'academic-class', component: AcademicClassViewComponent },
  { path: 'academic-class-create', component: AcademicClassCreateComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'academic-class-edit/:id', component: AcademicClassEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'subjects', component: SubjectViewComponent },
  { path: 'subject-create', component: SubjectCreateComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'subject-edit/:id', component: SubjectEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'employees', component: EmployeeViewComponent },
  { path: 'employee-create', component: EmployeeCreateComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'employee-edit/:id', component: EmployeeEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'calendar', component: EventCalendarComponent },
  { path: 'holidays', component: HolidayViewComponent },
  { path: 'holiday-create', component: HolidayCreateComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'holiday-edit/:id', component: HolidayEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'teachers', component: TeacherViewComponent },
  { path: 'teacher-create', component: TeacherCreateComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'teacher-edit/:id', component: TeacherEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'teacher-subject', component: TeacherSubjectComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'teacher-profile/:id', component: TeacherProfileComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'teacher-subject-edit/:id', component: TeacherSubjectEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'qualifications', component: QualificationViewActionComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'sections', component: SectionViewComponent },
  { path: 'section-create', component: SectionCreateComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'section-edit/:id', component: SectionEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'students', component: StudentViewComponent },
  { path: 'student-create', component: StudentCreateComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'student-edit/:id', component: StudentEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'student-profile/:id', component: StudentProfileComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
