import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { AppState } from './shared/interfaces/app-state';
import { moviesReducer } from './shared/reducers/movies-reducer';

import { AuthService } from './shared/services/auth/auth.service';
import { MoviesService } from './shared/services/movies/movies.service';

import { AppComponent } from './app.component';
import { NoContentComponent } from './no-content/no-content.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { LoginComponent } from './login/login.component';

import { ROUTES } from './app.routes';
import { DurationPipe } from './shared/pipes/duration.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NoContentComponent,
    CoursesComponent,
    CourseComponent,
    LoginComponent,
    DurationPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    StoreModule.forRoot<AppState>({ moviesState: moviesReducer }),
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [AuthService, MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
