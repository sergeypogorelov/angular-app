import { Routes } from '@angular/router';

import { NoContentComponent } from './no-content/no-content.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { LoginComponent } from './login/login.component';

export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/courses',
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'courses',
        component: CoursesComponent
    },
    {
        path: 'courses/:id',
        component: CourseComponent
    },
    {
        path: '**',
        component: NoContentComponent
    }
];