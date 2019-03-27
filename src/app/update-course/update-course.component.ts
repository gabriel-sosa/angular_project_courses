import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { CourseService } from '../services/course.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {

  course = new FormGroup({
    _id: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private userService: UserService
  ) { }

  ngOnInit() {
    const currentUser = this.userService.getUser();
    this.courseService.getCourse(this.route.snapshot.paramMap.get('id'))
      .then(data => {
        if (currentUser && data.user.emailAddress === currentUser.emailAddress)
          return data;
        else
          throw this.router.navigate(['/']);
      })
      .then(data => this.course.patchValue({
        _id: data._id,
        title: data.title,
        description: data.description
      }))
      .catch(err => console.log(err));
  }

  onSubmit() {
    this.courseService.updateCourse(this.course.value)
      .then(() => this.router.navigate([`/course/${this.course.value._id}`]))
      .catch(err => console.log(err));
  }

}
