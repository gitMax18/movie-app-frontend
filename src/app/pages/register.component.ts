import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../utils/customValidators';

@Component({
  selector: 'app-register',
  template: `
    <app-form-layout>
      <app-page-title>Register</app-page-title>
      <form class="form" [formGroup]="registerForm">
        <div class="form__field">
          <label class="form__label" for="email">Email</label>
          <p
            class="form__error"
            *ngIf="registerForm.controls.email.invalid && isInvalidForm"
          >
            Must be a valid email
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
            *ngIf="registerForm.controls.password.invalid && isInvalidForm"
          >
            6 characters minimum required
          </p>
          <input
            formControlName="password"
            class="form__input"
            type="password"
            id="password"
          />
        </div>
        <div class="form__field">
          <label class="form__label" for="confirmPassword"
            >Confirm password</label
          >
          <p
            class="form__error"
            *ngIf="registerForm.hasError('confirmPassword') && isInvalidForm"
          >
            Password and confirm Password must be same
          </p>
          <input
            formControlName="confirmPassword"
            class="form__input"
            type="password"
            id="confirmPassword"
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
export class RegisterComponent {
  isInvalidForm = false;
  registerForm = new FormGroup(
    {
      email: new FormControl<String>('', [
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl<String>('', [
        Validators.min(6),
        Validators.required,
      ]),
      confirmPassword: new FormControl<String>('', []),
    },
    [CustomValidators.confirmPassword()]
  );

  handleSubmit() {
    if (this.registerForm.invalid) {
      this.isInvalidForm = true;
      return;
    }
    console.log(this.registerForm.value);
  }
}
