import { ContentType } from './../types';
import { Component } from '@angular/core';

@Component({
  selector: 'app-content-form',
  template: `
    <form class="form">
      <div class="form__field">
        <label class="form__label" for="title">Title</label>
        <input class="form__input" type="text" id="title" />
      </div>
      <div class="form__fields">
        <div class="form__field">
          <label class="form__label" for="releaseYear">Release year</label>
          <input class="form__input" type="number" id="releaseYear" />
        </div>
        <div class="form__field">
          <label class="form__label" for="type">Type</label>
          <select class="form__input" name="type" id="type">
            <option *ngFor="let type of contentType" [value]="type">
              {{ type }}
            </option>
          </select>
        </div>
      </div>
      <div class="form__field">
        <label class="form__label" for="shortResume">Short resume</label>
        <input class="form__input" type="text" id="shortResume" />
      </div>
      <div class="form__field">
        <label class="form__label" for="resume">Resume</label>
        <textarea class="form__textarea" id="resume"></textarea>
      </div>
      <div class="form__btn">
        <app-button type="submit">Submit</app-button>
      </div>
    </form>
  `,
  styles: [
    `
      .form {
        width: 100%;

        &__fields {
          display: flex;
          justify-content: space-between;
          align-item: center;
          gap: 2rem;
        }
        &__field {
          margin-bottom: 1.5rem;
          width: 100%;
        }
        &__label {
          color: var(--color-light);
        }
        &__input {
          display: block;
          width: 100%;
          padding: 0.5rem;
        }
        &__textarea {
          display: block;
          width: 100%;
          padding: 0.5rem;
          height: 15rem;
        }
        &__btn {
          width: 50%;
          margin: 0 auto;
          min-width: 50rem;
        }
      }
    `,
  ],
})
export class ContentFormComponent {
  contentType = Object.values(ContentType);
}
