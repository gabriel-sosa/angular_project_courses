import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserService } from './user.service';
import { Course } from '../interfaces/course.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private userService: UserService,
    private http: HttpClient
  ) { }

  public getCourses(): Observable<any> {
    return this.http.get("https://rest-api-treehouse-project-9.herokuapp.com/api/courses")
  }

  public getCourse(id: string): Observable<any> {
    return this.http.get(`https://rest-api-treehouse-project-9.herokuapp.com/api/courses/${id}`)
  }

  public createCourse(body: Course): Observable<any>{
    const user = this.userService.getUser().info.headers.Authorization;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: user
      }),
      responseType: 'text' as 'text'
    };
    return this.http.post('https://rest-api-treehouse-project-9.herokuapp.com/api/courses', body, httpOptions);
  }

  public updateCourse(body: Course): Observable<any> {
    const user = this.userService.getUser().info.headers.Authorization;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: user
      })
    };
    return this.http.put(`https://rest-api-treehouse-project-9.herokuapp.com/api/courses/${body._id}`, body, httpOptions);
  }

  public deleteCourse(id: String): Observable<any> {
    const currentUser = this.userService.getUser().info.headers.Authorization;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: currentUser
      })
    };
    return this.http.delete(`https://rest-api-treehouse-project-9.herokuapp.com/api/courses/${id}`, httpOptions);
  }
}
