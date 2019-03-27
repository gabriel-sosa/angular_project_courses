import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { validator } from '../validator.function'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  customError: String;

  user = new FormGroup({
    email: new FormControl('', [
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
    private router: Router
    ) { }

  onSubmit() {
    if(this.user.valid)
      this.userService.signIn(this.user.value)
        .then(() => this.router.navigate(['/']))
        .catch(err => this.customError = err.message);
  }

  ngOnInit() {
  }

}
