import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CourseService } from '../services/course.service';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user.interface';
import { Course } from '../interfaces/course.interface';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course: Course;

  currentUser: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.currentUser = this.userService.getUser();
    this.courseService.getCourse(this.route.snapshot.paramMap.get('id'))
      .then(data => this.course = data)
      .catch(err => console.log(err));
  }

  handleDelete() {
    this.courseService.deleteCourse(this.course._id)
      .then(() => this.router.navigate(['/']))
      .catch(err => console.log(err));
  }

}
