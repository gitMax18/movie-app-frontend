import { Component } from '@angular/core';

@Component({
  selector: 'app-page-title',
  template: `
    <h1 class="title">
      <ng-content></ng-content>
    </h1>
  `,
  styles: [
    `
      .title {
        color: var(--color-primary);
        margin-bottom: 2rem;
      }
    `,
  ],
})
export class PageTitleComponent {}
