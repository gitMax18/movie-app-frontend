import { Component } from '@angular/core';
import { ContentService } from '../service/content.service';
import { ApiError, ContentData } from '../types';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-content',
  template: `
    <app-form-layout>
      <app-page-title>Add Content</app-page-title>
      <app-content-form (onSubmit)="handleSubmit($event)"></app-content-form>
    </app-form-layout>
  `,
  styles: [],
})
export class AddContentComponent {
  constructor(private contentService: ContentService, private router: Router) {}

  handleSubmit(contentData: FormData) {
    this.contentService
      .createContent(contentData)
      .subscribe(() => this.router.navigateByUrl(''));
  }
}
