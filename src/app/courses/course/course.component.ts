import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @Input() title: String;

  @Input() id: String;

  @Input() author: String;

  constructor() { }

  ngOnInit() {
  }

}
