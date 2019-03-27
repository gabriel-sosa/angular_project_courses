import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        left: '0%'
      })),
      state('close', style({
        left: '-10%'
      })),
      transition('open => close', [
        animate('0.25s')
      ]),
      transition('close => open', [
        animate('0.25s')
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {

  navbarOpen: Boolean = false;

  constructor(private userService: UserService) { }

  onClick(){
    this.userService.signOut();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  ngOnInit() {
  }

}
