import { Component } from '@angular/core';
import { ContentService } from '../service/content.service';
import { Observable } from 'rxjs';
import { ApiContent } from '../types';

@Component({
  selector: 'app-home',
  template: `
    <div class="home">
      <div class="home__contents" *ngIf="content$ | async as contents">
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
        }
      }
    `,
  ],
})
export class HomeComponent {
  constructor(private contentService: ContentService) {}

  content$?: Observable<ApiContent[]>;

  ngOnInit() {
    this.content$ = this.contentService.getAllContent();
  }
}
