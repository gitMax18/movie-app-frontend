import { Component } from '@angular/core';
import { ContentService } from '../service/content.service';
import { Observable } from 'rxjs';
import { ApiContent } from '../types';

@Component({
  selector: 'app-home',
  template: `
    <div class="home">
      <app-content-filter
        (onSearch)="handleFilter($event)"
      ></app-content-filter>
      <div class="home__contents" *ngIf="content$ | async as contents">
        <p class="home__contents--empty" *ngIf="contents.length === 0">
          No content find...
        </p>
        <app-content-card
          *ngFor="let content of contents"
          [content]="content"
        ></app-content-card>
      </div>
    </div>
  `,
  styles: [
    `
      .home {
        &__contents {
          display: flex;
          justify-content: flex-start;
          gap: 1.5rem;
          flex-wrap: wrap;
          &--empty {
            color: var(--color-light);
            font-size: 2rem;
          }
        }
      }
    `,
  ],
})
export class HomeComponent {
  constructor(private contentService: ContentService) {}

  content$?: Observable<ApiContent[]>;

  ngOnInit() {
    this.getContentsWithFilters('');
  }

  handleFilter(value: string) {
    this.getContentsWithFilters(value);
  }

  getContentsWithFilters(titleFilter: string) {
    this.content$ = this.contentService.getAllContent(titleFilter);
  }
}
