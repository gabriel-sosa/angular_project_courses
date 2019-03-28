import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { UserService } from '../services/user.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {

  loading: Boolean = false;

  course = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private router: Router,
    private sanckNar: MatSnackBar
  ) { }

  ngOnInit() {
    if (!this.userService.getUser()) {
      this.router.navigate(['/signin']);
    }
  }

  onSubmit(){
    if(this.course.valid && !this.loading){
      this.loading = true;
      this.courseService.createCourse(this.course.value)
        .then(() => this.router.navigate(['/']))
        .catch(err => {
          this.loading = false;
          this.sanckNar.open(err.message, 'ok');
        });
    }
  }

}
