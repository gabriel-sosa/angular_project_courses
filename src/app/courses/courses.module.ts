import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { CourseComponent } from './course/course.component';
import { CourseListComponent } from './course-list/course-list.component';
import { MaterialsModule } from '../materials/materials.module';

@NgModule({
  declarations: [
    CourseComponent,
    CourseListComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    MaterialsModule
  ],
  exports: [
    CourseListComponent
  ]
})
export class CoursesModule { }
