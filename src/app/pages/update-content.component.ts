import { Component } from '@angular/core';
import { ApiContent, ContentData } from '../types';
import { Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../service/content.service';

@Component({
  selector: 'app-update-content',
  template: `
    <div>
      <app-page-title>Update</app-page-title>
      <app-content-form
        (onSubmit)="handleSubmit($event)"
        *ngIf="content$ | async as content"
        [content]="content"
      ></app-content-form>
    </div>
  `,
  styles: [],
})
export class UpdateContentComponent {
  content$?: Observable<ApiContent | null>;
  contentId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService
  ) {}

  ngOnInit() {
    this.content$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (!id) return of(null);
        this.contentId = +id;
        return this.contentService.getContentById(+id);
      })
    );
  }

  handleSubmit(contentData: FormData) {
    if (!this.contentId) return;
    this.contentService
      .updateContent(this.contentId, contentData)
      .subscribe(() => {
        this.router.navigateByUrl(`/content/${this.contentId}`);
      });
  }
}
