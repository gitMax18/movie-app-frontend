import { Observable } from 'rxjs';
import { CategoryService } from '../service/category.service';
import { Category, ContentData, ContentType } from './../types';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContentService } from '../service/content.service';
import { CustomValidators } from '../utils/customValidators';

@Component({
  selector: 'app-content-form',
  template: `
    <form class="form" (submit)="handleSubmit()" [formGroup]="contentForm">
      <div class="form__field">
        <label class="form__label" for="title">Title</label>
        <p
          class="form__error"
          *ngIf="contentForm.controls.title.invalid && isInvalidForm"
        >
          Title is required
        </p>
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
          <p
            class="form__error"
            *ngIf="contentForm.controls.releaseYear.invalid && isInvalidForm"
          >
            Add number between 1901 and 2155
          </p>
          <input
            formControlName="releaseYear"
            class="form__input"
            type="number"
            id="releaseYear"
          />
        </div>
        <div class="form__field">
          <label class="form__label" for="type">Type</label>
          <p
            class="form__error"
            *ngIf="contentForm.controls.type.invalid && isInvalidForm"
          >
            Type is required
          </p>
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
        <label class="form__label form__label--margin" for="categories"
          >Select categories</label
        >
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
        <p
          class="form__error"
          *ngIf="contentForm.controls.resume.invalid && isInvalidForm"
        >
          Add number between 1901 and 2155
        </p>
        <textarea
          formControlName="resume"
          class="form__textarea"
          id="resume"
        ></textarea>
      </div>
      <div class="form__btn">
        <app-button [type]="'submit'">Submit</app-button>
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
          align-items: center;
          gap: 2rem;
        }
        &__field {
          margin-bottom: 1.5rem;
          width: 100%;
        }
        &__label {
          display: block;
          color: var(--color-light);
          font-size: 1.8rem;
          &--margin {
            margin-bottom: 0.5rem;
          }
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
        &__error {
          color: var(--color-primary);
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

  isInvalidForm = false;

  categories$?: Observable<Category[]>;

  contentForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    releaseYear: new FormControl<number | null>(null, [
      Validators.required,
      CustomValidators.invalidNumberValue(),
    ]),
    type: new FormControl<string>('', [Validators.required]),
    categories: new FormControl<number[]>([]),
    shortResume: new FormControl<string>(''),
    resume: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private categoryService: CategoryService,
    private contentService: ContentService
  ) {}

  ngOnInit() {
    this.categories$ = this.categoryService.getAllCategories();
  }

  handleSubmit() {
    if (this.contentForm.invalid) {
      this.isInvalidForm = true;
      return;
    }
    this.isInvalidForm = false;
    this.contentService
      .createContent(this.contentForm.value as ContentData)
      .subscribe((response) => console.log(response));
  }
}
