import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  user: any

  constructor(private http: HttpClient) { }

  public signIn({email, password}): Observable<any>{
    const authorization = 'Basic ' + btoa(`${email}:${password}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization
      })
    };
    return this.http.get('https://rest-api-treehouse-project-9.herokuapp.com/api/users', httpOptions)
      .pipe(
        map(data => 
          this.user = {
            info: {
              headers: {
                Authorization: authorization
              },
            },
            ...data
          }
        )
      )
  }

  public signUp(body: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'text'
    }
    return this.http.post('https://rest-api-treehouse-project-9.herokuapp.com/api/users', body, httpOptions )
  }

  public signOut(): void {
    this.user = undefined;
  }

  public getUser(): User {
    return this.user;
  }

  

}