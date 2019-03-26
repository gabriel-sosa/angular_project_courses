import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    emailAddress: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  onSubmit(){
    this.userService.signUp(this.user.value)
      .then(() => this.router.navigate(['/signin']))
      .catch(err => console.log(err));
  }

  ngOnInit() {
  }

}
