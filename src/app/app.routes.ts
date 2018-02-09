import { Routes } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { AuthComponent } from './auth/auth.component';

export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/courses',
    },
    {
        path: 'login',
        pathMatch: 'full',
        redirectTo: '/auth/login'
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
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'auth/:action',
        component: AuthComponent
    }
];