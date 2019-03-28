import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  user: User

  constructor(private http: HttpClient) { }

  public signIn({email, password}): Promise<any>{
    const authorization = 'Basic ' + btoa(`${email}:${password}`);
    const info = {
			headers: {
				Authorization: authorization
			}
    };
    return fetch('https://rest-api-treehouse-project-9.herokuapp.com/api/users', info)
			.then(data => {
				if (data.ok)
					return data.json();
				else
					throw new Error('wrong email or password');
      })
      .then(data => {
        this.user = {
          info: info,
          ...data
        };
        return data;
      });
  }

  public signUp(body: User): Promise<any> {
    const info = {
      method: 'POST', 
      body: JSON.stringify(body), 
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return fetch('https://rest-api-treehouse-project-9.herokuapp.com/api/users', info)
      .then(data => data.ok ? false : data.json())
      .then(error => {
        if (error)
          throw error;
      });
  }

  public signOut(): void {
    this.user = undefined;
  }

  public getUser(): User {
    return this.user;
  }

  

}
