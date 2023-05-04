import { Component } from '@angular/core';
import { ContentService } from '../service/content.service';
import { ContentData } from '../types';

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
  constructor(private contentService: ContentService) {}

  handleSubmit(contentData: ContentData) {
    this.contentService
      .createContent(contentData)
      .subscribe((response) => console.log(response));
  }
}
