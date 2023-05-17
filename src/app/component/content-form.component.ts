import { Observable, Subscription, map, take, tap } from 'rxjs';
import { CategoryService } from '../service/category.service';
import { ApiContent, Category, ContentData, ContentType } from './../types';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../utils/customValidators';
import { ContentService } from '../service/content.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-content-form',
  template: `
    <form
      class="form"
      (submit)="handleSubmit()"
      [formGroup]="contentForm"
      enctype="multipart/form-data"
    >
      <p class="form__error" *ngIf="error['global']">{{ error['global'] }}</p>
      <div class="form__field">
        <label class="form__label" for="title">Title</label>
        <p
          class="form__error"
          *ngIf="contentForm.controls.title.invalid && isInvalidForm"
        >
          Title is required
        </p>
        <p class="form__error" *ngIf="error['title']">
          {{ error['title'] }}
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
            *ngIf="
              (contentForm.controls.releaseYear.invalid && isInvalidForm) ||
              error['releaseYear']
            "
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
            *ngIf="
              (contentForm.controls.type.invalid && isInvalidForm) ||
              error['type']
            "
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
        <label class="form__label" for="file">Add image</label>
        <input
          type="file"
          name="file"
          id="file"
          (change)="uploadFile($event)"
        />
      </div>
      <div class="form__field">
        <label class="form__label" for="resume">Resume</label>
        <p
          class="form__error"
          *ngIf="
            (contentForm.controls.resume.invalid && isInvalidForm) ||
            error['resume']
          "
        >
          resume is required
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
  styles: [``],
})
export class ContentFormComponent {
  @Input() content: ApiContent | null = null;
  @Output() onSubmit = new EventEmitter<FormData>();
  error: Record<string, string> = {};
  errorSubscribtion?: Subscription;
  formData: FormData = new FormData();

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
    private contentService: ContentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // get category for display on form
    this.categories$ = this.categoryService.getAllCategories();

    // get error when submit form
    this.errorSubscribtion = this.contentService.httpError$.subscribe({
      next: (err) => (this.error = err),
    });

    // if update get content data
    if (this.content) {
      this.contentForm.patchValue({
        title: this.content.title,
        releaseYear: this.content.releaseYear,
        type: this.content.type,
        categories: this.content.categories.map((c) => c.id),
        shortResume: this.content.shortResume || '',
        resume: this.content.resume,
      });
    }
    // get userid
    this.authService.user$
      .pipe(
        take(1),
        tap((user) => console.log(user)),
        map((user) => user?.id.toString())
      )
      .subscribe((id) => {
        console.log('id', id);
        if (id) {
          this.formData.append('userId', id);
        }
      });
  }

  uploadFile(e: Event) {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.formData.append('file', file, file.name);
  }

  ngOnDestroy() {
    this.errorSubscribtion?.unsubscribe();
  }

  handleSubmit() {
    if (this.contentForm.invalid) {
      this.isInvalidForm = true;
      return;
    }
    this.isInvalidForm = false;
    Object.keys(this.contentForm.controls).forEach((formControlName) => {
      if (formControlName === 'file') return;
      this.formData.append(
        formControlName,
        this.contentForm.get(formControlName)?.value
      );
    });
    this.formData.forEach((field) => console.log(field));
    this.onSubmit.emit(this.formData);
  }
}
