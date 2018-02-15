import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './shared/services/auth/auth.service';
import { MoviesService } from './shared/services/movies/movies.service';

import { AppComponent } from './app.component';
import { NoContentComponent } from './no-content/no-content.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { LoginComponent } from './login/login.component';

import { ROUTES } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    NoContentComponent,
    CoursesComponent,
    CourseComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [AuthService, MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
