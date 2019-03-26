import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  onSubmit() {
    this.userService.signIn(this.user.value)
      .then(() => this.router.navigate(['/']))
      .catch(err => console.log());
  }

  ngOnInit() {
  }

}
