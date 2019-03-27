import { Injectable } from '@angular/core';

import { UserService } from './user.service';
import { Course } from '../interfaces/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private userService: UserService) { }

  public getCourses(): Promise<any> {
    return fetch("https://rest-api-treehouse-project-9.herokuapp.com/api/courses")
      .then(data => data.json());
  }

  public getCourse(id: string): Promise<any> {
    return fetch(`https://rest-api-treehouse-project-9.herokuapp.com/api/courses/${id}`)
      .then(data => data.json());
  }

  public createCourse(body: Course): Promise<any>{
    const user = this.userService.getUser().info.headers.Authorization;
    const info = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.toString()
      },
      body: JSON.stringify(body)
    };
    return fetch('https://rest-api-treehouse-project-9.herokuapp.com/api/courses', info)
      .then(data => data.ok ? false : data.json())
      .then(error => {
        if (error)
          throw error;
    });
  }

  public updateCourse(body: Course): Promise<any> {
    const user = this.userService.getUser().info.headers.Authorization;
    const info = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.toString()
      },
      body: JSON.stringify(body)
    };
    return fetch(`https://rest-api-treehouse-project-9.herokuapp.com/api/courses/${body._id}`, info)
      .then(data => data.ok ? false : data.json())
      .then(error => {
        if (error)
          throw error;
      });
  }

  public deleteCourse(id: String): Promise<any> {
    const currentUser = this.userService.getUser().info.headers.Authorization;
    const info = {
      method: 'DELETE',
      headers: {
        Authorization: currentUser.toString()
      }
    }
    return fetch(`https://rest-api-treehouse-project-9.herokuapp.com/api/courses/${id}`, info)
      .then(data => {
        if (data.ok) 
          return;
        else
          throw new Error();
      });
  }
}
