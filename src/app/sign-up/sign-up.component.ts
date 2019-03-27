import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service'; 

function validator(regex: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = regex.test(control.value);
    return forbidden ? null : {'forbiddenName': {value: control.value}};
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      validator(/[A-Za-z]+/)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      validator(/[A-Za-z]+/)
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
    private router: Router
  ) { }

  onSubmit(){
    console.log(this.user.controls.firstName.valid)
    if (this.user.valid) {
      this.userService.signUp(this.user.value)
        .then(() => this.router.navigate(['/signin']))
        .catch(err => alert(err.message));
    }
  }

  ngOnInit() {
  }

}
