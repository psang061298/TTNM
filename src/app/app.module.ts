import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/account/login/login.component';
import { SubjectComponent } from './components/admin/subject/subject.component';
import { AdminCourseComponent } from './components/admin/admin-course/admin-course.component';
import { SubjectDetailComponent } from './components/admin/subject-detail/subject-detail.component';
import { CourseComponent } from './components/customer/course/course.component';
import { CourseDetailComponent } from './components/customer/course-detail/course-detail.component';
import { SignUpComponent } from './components/account/sign-up/sign-up.component';
import { HomeComponent } from './components/customer/home/home.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { FooterComponent } from './components/customer/footer/footer.component';
import { HeaderComponent } from './components/customer/header/header.component';
import { AdminBaseComponent } from './components/admin/admin-base/admin-base.component';
import { RegistrationComponent } from './components/admin/registration/registration.component';
import { RegistrationDetailComponent } from './components/admin/registration-detail/registration-detail.component';
import { AdminClassesComponent } from './components/admin/admin-classes/admin-classes.component';
import { AdminClassDetailComponent } from './components/admin/admin-class-detail/admin-class-detail.component';

import { AuthGuard } from './services/guard/auth.guard';
import { MyCoursesComponent } from './components/customer/my-courses/my-courses.component';
import { ScheduleComponent } from './components/customer/schedule/schedule.component';
import { ScoreComponent } from './components/customer/score/score.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProgramComponent } from './components/admin/program/program.component';
import { CertificateComponent } from './components/customer/certificate/certificate.component';
import { UserManagementComponent } from './components/admin/user-management/user-management.component';

import { NgxPrinterModule } from 'ngx-printer';
import { ProfileComponent } from './components/customer/profile/profile.component';


const appRoutes: Routes = [
  {
    path : '',
    component: HomeComponent
  },
  {
    path : 'home',
    component: HomeComponent
  },
  {
    path : 'login',
    component: LoginComponent
  },
  {
    path : 'signup',
    component: SignUpComponent
  },
  { 
    path : 'courses',
    component: CourseComponent
  },
  {
    path : 'courses/:id',
    component: CourseDetailComponent
  },
  {
    path : 'my-courses',
    component: MyCoursesComponent
  },
  {
    path : 'schedule',
    component: ScheduleComponent
  },
  {
    path : 'score',
    component : ScoreComponent,
  },
  {
    path : 'certificate',
    component : CertificateComponent,
  },
  {
    path : 'profile',
    component : ProfileComponent,
  },
  {
    path : 'admin',
    component: AdminBaseComponent,
    canActivate : [AuthGuard],
    children : [
      {
        path : '',
        component : AdminHomeComponent,
      },
      {
        path : 'registration',
        component : RegistrationComponent,
      },
      {
        path : 'registration/:id',
        component : RegistrationDetailComponent,
      },
      {
        path : 'classes',
        component : AdminClassesComponent,
      },
      {
        path : 'classes/:id',
        component : AdminClassDetailComponent,
      },
      {
        path : 'subjects',
        component: SubjectComponent
      },
      {
        path : 'subjects/:id',
        component: SubjectDetailComponent
      },
      {
        path : 'courses',
        component: AdminCourseComponent
      },
      {
        path : 'program',
        component: ProgramComponent
      },
      {
        path : 'user',
        component: UserManagementComponent
      },

    ],
  }
];

export const routing: ModuleWithProviders =  
    RouterModule.forRoot(appRoutes);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SubjectComponent,
    SubjectDetailComponent,
    CourseComponent,
    CourseDetailComponent,
    SignUpComponent,
    HomeComponent,
    AdminHomeComponent,
    FooterComponent,
    HeaderComponent,
    AdminBaseComponent,
    RegistrationComponent,
    RegistrationDetailComponent,
    AdminClassesComponent,
    AdminClassDetailComponent,
    MyCoursesComponent,
    ScheduleComponent,
    ScoreComponent,
    AdminCourseComponent,
    ProgramComponent,
    UserManagementComponent,
    CertificateComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes),
    NgxPrinterModule.forRoot({printOpenWindow: true})
  ],
  providers: [
    AuthGuard,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
