import { Component } from '@angular/core';
import { ContentService } from '../service/content.service';
import { ApiError, ContentData } from '../types';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-content',
  template: `
    <div class="addContent">
      <app-page-title>Add Content</app-page-title>
      <app-content-form (onSubmit)="handleSubmit($event)"></app-content-form>
    </div>
  `,
  styles: [
    `
      .addContent {
        max-width: 100rem;
        margin: 0 auto;
      }
    `,
  ],
})
export class AddContentComponent {
  constructor(private contentService: ContentService, private router: Router) {}

  handleSubmit(contentData: FormData) {
    this.contentService
      .createContent(contentData)
      .subscribe(() => this.router.navigateByUrl(''));
  }
}
