import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../entities/user';

const LOCAL_STORAGE_KEY = 'auth';
const CORRECT_USER_LOGIN = 'q';
const CORRECT_USER_PASSWORD = 'q';

@Injectable()
export class AuthService {

  constructor() {
    if (!window.localStorage)
      throw new Error('Oops... Seems like your browser doesn\'t support feature localStorage.');
  }

  checkCurrentUserIsAuthenticated(): boolean {
    return !!localStorage.getItem(LOCAL_STORAGE_KEY);
  }

  getCurrentUser(): User {
    let jsonStr = localStorage.getItem(LOCAL_STORAGE_KEY).trim();

    if (!jsonStr)
      return null;

    return User.createFromJSON(jsonStr);
  }

  login(userLogin: string, userPassword: string): Observable<User> {
    return new Observable<User>(observer => {
      let login = userLogin.trim();
      let password = userPassword.trim();

      if (login === CORRECT_USER_LOGIN && password === CORRECT_USER_PASSWORD) {
        let user = new User(login);
        localStorage.setItem(LOCAL_STORAGE_KEY, User.serializeToJSON(user));

        observer.next(user);
      } else {
        observer.error();
      }

      observer.complete();
    });
  }

}
