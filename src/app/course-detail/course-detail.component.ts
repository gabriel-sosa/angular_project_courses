import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course: Object;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
    ) { }

  ngOnInit() {
    this.courseService.getCourse(this.route.snapshot.paramMap.get('id'))
      .then(data => this.course = data);
  }

}
