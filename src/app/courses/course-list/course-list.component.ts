import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Object[];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getCourses()
      .then(data => this.courses = data);
  }

}
