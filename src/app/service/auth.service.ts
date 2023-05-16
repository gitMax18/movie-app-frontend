import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/environment/env';
import { ApiResponse, ApiToken, ApiUser, AuthData } from '../types';
import { BehaviorSubject, map } from 'rxjs';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authUrl = env.base_url + '/auth';
  token: string | null = null;

  private _isAuthenticated$ = new BehaviorSubject(false);
  isAuthenticated$ = this._isAuthenticated$.asObservable();

  private _user = new BehaviorSubject<ApiUser | null>(null);
  user = this._user.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token) as ApiToken;
      console.log('decoded token', decodedToken);
      if (!this.isTokenExpired(decodedToken)) {
        this.token = token;
        this._user.next(decodedToken.user);
        this._isAuthenticated$.next(true);
      }
    }
  }

  login(authData: AuthData) {
    this.http
      .post<ApiResponse<string>>(this.authUrl + '/login', authData)
      .pipe(map((response) => response.data))
      .subscribe({
        next: (token) => this.authenticateUser(token),
      });
  }

  register(authData: AuthData) {
    this.http
      .post<ApiResponse<string>>(this.authUrl + '/register', authData)
      .pipe(map((response) => response.data))
      .subscribe({
        next: (token) => {
          this.authenticateUser(token);
        },
      });
  }

  getUser() {
    this.http
      .get<ApiResponse<ApiUser>>(this.authUrl + '/user')
      .pipe(map((response) => response.data))
      .subscribe({
        next: (user) => {
          this._user.next(user);
          this._isAuthenticated$.next(true);
        },
      });
  }

  private authenticateUser(token: string) {
    const decodedToken = jwtDecode(token) as ApiToken;
    this.token = token;
    this._user.next(decodedToken.user);
    this._isAuthenticated$.next(true);
    localStorage.setItem('token', token);
    this.router.navigateByUrl('/');
  }

  private isTokenExpired(decodedToken: ApiToken) {
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp > currentTime) {
      return false;
    }
    return true;
  }
}
