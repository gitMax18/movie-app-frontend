import { Observable } from 'rxjs';
import { CategoryService } from '../service/category.service';
import { Category, ContentType } from './../types';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-content-form',
  template: `
    <form class="form" (submit)="handleSubmit()" [formGroup]="contentForm">
      <div class="form__field">
        <label class="form__label" for="title">Title</label>
        <input
          formControlName="title"
          class="form__input"
          type="text"
          id="title"
        />
      </div>
      <div class="form__fields">
        <div class="form__field">
          <label class="form__label" for="releaseYear">Release year</label>
          <input
            formControlName="releaseYear"
            class="form__input"
            type="number"
            id="releaseYear"
          />
        </div>
        <div class="form__field">
          <label class="form__label" for="type">Type</label>
          <select
            formControlName="type"
            class="form__input"
            name="type"
            id="type"
          >
            <option *ngFor="let type of contentType" [value]="type">
              {{ type }}
            </option>
          </select>
        </div>
      </div>
      <div class="form__field" *ngIf="categories$ | async as categories">
        <app-select-categories
          formControlName="categories"
          [categories]="categories"
        ></app-select-categories>
      </div>
      <div class="form__field">
        <label class="form__label" for="shortResume">Short resume</label>
        <input
          formControlName="shortResume"
          class="form__input"
          type="text"
          id="shortResume"
        />
      </div>
      <div class="form__field">
        <label class="form__label" for="resume">Resume</label>
        <textarea
          formControlName="resume"
          class="form__textarea"
          id="resume"
        ></textarea>
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
          font-size: 1.8rem;
        }
        &__input {
          display: block;
          width: 100%;
          padding: 0.5rem;
          font-size: 1.8rem;
        }
        &__textarea {
          display: block;
          width: 100%;
          padding: 0.5rem;
          height: 15rem;
          font-size: 1.8rem;
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

  categories$?: Observable<Category[]>;

  contentForm = new FormGroup({
    title: new FormControl(''),
    releaseYear: new FormControl(''),
    type: new FormControl(''),
    categories: new FormControl([]),
    shortResume: new FormControl(''),
    resume: new FormControl(''),
  });

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categories$ = this.categoryService.getAllCategories();
  }

  handleSubmit() {
    console.log(this.contentForm.value);
  }
}
