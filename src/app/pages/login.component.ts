import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { AuthData } from '../types';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  template: `
    <app-form-layout>
      <app-page-title>Login</app-page-title>
      <form class="form" [formGroup]="loginForm">
        <p *ngIf="error['global']" class="form__error">{{ error['global'] }}</p>
        <div class="form__field">
          <label class="form__label" for="email">Email</label>
          <p
            class="form__error"
            *ngIf="loginForm.controls.email.invalid && isInvalidForm"
          >
            Email is required
          </p>
          <input
            formControlName="email"
            class="form__input"
            type="email"
            id="email"
          />
        </div>
        <div class="form__field">
          <label class="form__label" for="password">Password</label>
          <p
            class="form__error"
            *ngIf="loginForm.controls.password.invalid && isInvalidForm"
          >
            Password is required
          </p>
          <input
            formControlName="password"
            class="form__input"
            type="password"
            id="password"
          />
        </div>
        <div class="form__btn">
          <app-button (onClick)="handleSubmit()" class="form__btn"
            >Register</app-button
          >
        </div>
      </form>
    </app-form-layout>
  `,
  styles: [],
})
export class LoginComponent {
  error: Record<string, string> = {};
  errorSubsciption?: Subscription;
  isInvalidForm = false;
  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.errorSubsciption = this.authService.errorObject$.subscribe(
      (error) => (this.error = error)
    );
  }

  ngOnDestroy() {
    this.errorSubsciption?.unsubscribe();
  }

  handleSubmit() {
    if (this.loginForm.invalid) {
      this.isInvalidForm = true;
      return;
    }
    this.isInvalidForm = false;
    this.authService.login(this.loginForm.value as AuthData);
  }
}
