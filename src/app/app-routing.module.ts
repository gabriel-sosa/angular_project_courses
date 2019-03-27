import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component';

const routes: Routes = [
  { path: '', component: CourseListComponent },
  { path: 'course/:id', component:  CourseDetailComponent},
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'new', component: NewCourseComponent },
  { path: 'course/:id/update', component: UpdateCourseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
