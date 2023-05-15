import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  template: `
    <app-form-layout>
      <app-page-title>Register</app-page-title>
      <form class="form">
        <div class="form__field">
          <label class="form__label" for="email">Email</label>
          <input class="form__input" type="email" id="email" />
        </div>
        <div class="form__field">
          <label class="form__label" for="password">Password</label>
          <input class="form__input" type="password" id="password" />
        </div>
        <div class="form__field">
          <label class="form__label" for="confirmPassword"
            >Confirm password</label
          >
          <input class="form__input" type="password" id="confirmPassword" />
        </div>
        <div class="form__btn">
          <app-button class="form__btn">Register</app-button>
        </div>
      </form>
    </app-form-layout>
  `,
  styles: [],
})
export class RegisterComponent {}
