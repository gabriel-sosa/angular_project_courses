import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { CourseService } from '../services/course.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {

  loading: Boolean = false;

  course = new FormGroup({
    _id: new FormControl('', [
      Validators.required,
    ]),
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const currentUser = this.userService.getUser();
    this.courseService.getCourse(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        data => {
          if (currentUser && data.user.emailAddress === currentUser.emailAddress)
           this.course.patchValue({
              _id: data._id,
              title: data.title,
              description: data.description
            });
         else
           throw this.router.navigate(['/']);
        },
        err => console.log(err)
      )
  }

  onSubmit() {
    if (this.course.valid && !this.loading) {
      this.courseService.updateCourse(this.course.value).subscribe(
        () => this.router.navigate([`/course/${this.course.value._id}`]),
        err =>{ 
          this.snackBar.open('error in the sever', 'ok');
          this.loading = false;
        }
      );
      // this.courseService.updateCourse(this.course.value)
      //   .then(() => this.router.navigate([`/course/${this.course.value._id}`]))
      //   .catch(err => {
      //     this.snackBar.open(err.message, 'ok');
      //     this.loading = false;
      //   });
    }
  }

}
