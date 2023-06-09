import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../service/content.service';
import { switchMap, Observable, of, catchError, take, map } from 'rxjs';
import { ApiContent, Env } from '../types';
import { env } from 'src/environment/env';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-movie-detail',
  template: `
    <div class="content" *ngIf="content$ | async as content">
      <img
        class="content__img"
        [src]="
          content.imagePath
            ? env.base_url + '/contents/image/' + content.imagePath
            : '../../assets/image/default.jpg'
        "
        alt="default"
      />
      <div class="content__infos">
        <h1 class="content__title">{{ content.title }}</h1>
        <div class="content__categories">
          <app-category-badge
            *ngFor="let category of content.categories"
            [category]="category.name"
          ></app-category-badge>
        </div>
        <span class="content__release"
          >Release : {{ content.releaseYear }}</span
        >
        <span class="content__type"
          >Type : {{ content.type.toLowerCase() }}</span
        >
        <p class="content__resume">{{ content.resume }}</p>
        <div *ngIf="loggedUserId === content.userId">
          <div class="content__action">Actions</div>
          <hr class="content__action--row" />
          <div class="content__actions">
            <app-button (onClick)="handleDelete(content.id)" [style]="'danger'"
              >Delete</app-button
            >
            <app-button
              (onClick)="handleClickUpdate(content.id)"
              [style]="'success'"
              >Update</app-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="error" *ngIf="err$ | async as err">{{ err }}</div>
  `,
  styles: [
    `
      .error {
        color: var(--color-light);
      }
      .content {
        display: flex;
        gap: 1rem;
        &__img {
          width: 50%;
        }
        &__infos {
          color: var(--color-light);
        }
        &__title {
          color: var(--color-primary);
        }
        &__categories {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 0.5rem;
          margin: 1.5rem 0;
          flex-wrap: wrap;
        }
        &__release {
          margin-right: 1rem;
        }
        &__resume {
          color: var(--color-light);
          margin: 1.5rem 0;
        }
        &__action {
          color: var(--color-primary);
          &--row {
            border: 1px solid var(--color-primary);
            margin-bottom: 1.5rem;
          }
        }
        &__actions {
          display: grid;
          grid-template-columns: 1fr 3fr;
          gap: 1rem;
        }
      }
    `,
  ],
})
export class MovieDetailComponent {
  content$?: Observable<ApiContent | null>;
  err$?: Observable<string>;
  env: Env = env;
  loggedUserId: number | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.content$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');

        if (!id) {
          return of(null);
        }
        return this.contentService.getContentById(+id);
      }),
      catchError((err) => {
        this.err$ = of(err);
        return of(null);
      })
    );

    this.authService.user$
      .pipe(
        take(1),
        map((user) => user?.id)
      )
      .subscribe((id) => (this.loggedUserId = id));
  }

  handleDelete(id: number) {
    this.contentService.deleteContentById(id).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

  handleClickUpdate(id: number) {
    this.router.navigateByUrl('/content/update/' + id);
  }
}
