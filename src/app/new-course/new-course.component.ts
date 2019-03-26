import { Component, OnInit } from '@angular/core';
import { Router, ChildActivationStart } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { UserService } from '../user.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {

  course = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.userService.getUser()) {
      this.router.navigate(['/signin']);
    }
  }

  onSubmit(){
    this.courseService.createCourse(this.course.value);
  }

}
