import { env } from './../../environment/env';
import { Component, Input } from '@angular/core';
import { ApiContent, Env } from '../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-card',
  template: `
    <div *ngIf="content">
      <div class="card" (click)="handleNavigation(content.id)">
        <img
          class="card__img"
          [src]="
            content.imagePath
              ? env.base_url + '/contents/image/' + content.imagePath
              : '../../assets/image/default.jpg'
          "
          alt="default image"
        />
        <div class="card__infos">
          <div class="card__title">{{ content.title }}</div>
          <p class="card_shortResume">
            {{ content.shortResume || 'No short resume availabled' }}
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        width: 20rem;
        background-color: var(--color-grey-darken);
        cursor: pointer;
        &__img {
          height: 20rem;
          width: 100%;
          object-fit: cover;
        }
        &__infos {
          padding: 0.5rem;
          color: var(--color-light);
        }
        &__title {
          font-size: 1.8rem;
          font-weight: bold;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }
      }
    `,
  ],
})
export class ContentCardComponent {
  @Input() content?: ApiContent;
  env: Env = env;

  constructor(private router: Router) {}

  handleNavigation(contentId: number) {
    this.router.navigateByUrl('/content/' + contentId);
  }
}
