import { Injectable } from '@angular/core';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private userService: UserService) { }

  public getCourses() {
    return fetch("https://rest-api-treehouse-project-9.herokuapp.com/api/courses")
      .then(data => data.json());
  }

  public getCourse(id: string) {
    return fetch(`https://rest-api-treehouse-project-9.herokuapp.com/api/courses/${id}`)
      .then(data => data.json());
  }

  public createCourse(body: object){
    console.log(this.userService.getUser());
  }
}
