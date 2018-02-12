import { Injectable } from '@angular/core';

const LOGIN_KEY = 'auth';

@Injectable()
export class AuthService {

  constructor() {
    if (!window.localStorage)
      throw new Error('Oops... Seems like your browser doesn\'t support feature localStorage.');
  }

  checkCurrentUserIsAuthenticated(): boolean {
    return !!localStorage.getItem(LOGIN_KEY);
  }

  getCurrentUserLogin(): string {
    return localStorage.getItem(LOGIN_KEY);
  }

  login(userLogin: string): boolean {
    let login = userLogin.trim();

    if (login) {
      localStorage.setItem(LOGIN_KEY, login);
      return true;
    }

    return false;
  }

}
