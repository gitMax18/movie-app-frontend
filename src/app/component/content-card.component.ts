import { Component, Input } from '@angular/core';
import { ApiContent } from '../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-card',
  template: `
    <div *ngIf="content">
      <div class="card" (click)="handleNavigation(content.id)">
        <img
          class="card__img"
          src="../../assets/image/default.jpg"
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
        &__img {
          height: 20rem;
          width: 100%;
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

  constructor(private router: Router) {}

  handleNavigation(contentId: number) {
    this.router.navigateByUrl('/content/' + contentId);
  }
}
