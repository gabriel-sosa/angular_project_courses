import { Injectable } from '@angular/core';

import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  user: User

  constructor() { }

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

  private validateUserSignUp(user: User): any {
    return new Promise((resolve, reject) => {
      //if (!(user.firstName && /^[A-Za-z]+$/.test(user.firstName)))
      //  return reject({message: 'invalid first name'});
      // if (!(user.lastName && /^[A-Za-z]+$/.test(user.lastName)))
      //   return reject({message: 'invalid last name'});
      // if (!(user.emailAddress && /^.+@.+\..+$/.test(user.emailAddress)))
      //   return reject({message: 'invalid email'});
      // if (!user.password)
      //   return reject({message: 'insert a password'});
      resolve();
    })
  }

  public signUp(body: User): Promise<any> {
    const info = {
      method: 'POST', 
      body: JSON.stringify(body), 
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return this.validateUserSignUp(body)
      .then(() => fetch('https://rest-api-treehouse-project-9.herokuapp.com/api/users', info))
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
