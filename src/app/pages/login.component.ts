import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../utils/customValidators';

@Component({
  selector: 'app-login',
  template: `
    <app-form-layout>
      <app-page-title>Login</app-page-title>
      <form class="form" [formGroup]="loginForm">
        <div class="form__field">
          <label class="form__label" for="email">Email</label>
          <input
            formControlName="email"
            class="form__input"
            type="email"
            id="email"
          />
        </div>
        <div class="form__field">
          <label class="form__label" for="password">Password</label>
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
  loginForm = new FormGroup({
    email: new FormControl<String>(''),
    password: new FormControl<String>(''),
  });

  handleSubmit() {
    console.log(this.loginForm.value);
  }
}
