import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { UserService } from '../services/user.service';
import { validator } from '../validator.function';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  loading: boolean = false;

  user = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      validator(/^[A-Za-z]+$/)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      validator(/^[A-Za-z]+$/)
    ]),
    emailAddress: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      validator(/^.+@.+\..+$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  onSubmit(){
    if (this.user.valid && !this.loading) {
      this.loading = true;
      this.userService.signUp(this.user.value)
        .then(() => this.router.navigate(['/signin']))
        .catch(err => {
          this.snackBar.open(err.message, 'ok');
          this.loading = false;
        });
    }
  }

  ngOnInit() {
  }

}
