import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: Object

  constructor() { }

  public signIn({email, password}){
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

  public signUp(body: Object) {
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

  public signOut(){
    this.user = undefined;
  }

  public getUser(){
    return this.user;
  }

}
