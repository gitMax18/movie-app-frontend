import { Component } from '@angular/core';

@Component({
  selector: 'app-add-content',
  template: `
    <div class="addContent">
      <app-page-title>Add Content</app-page-title>
      <app-content-form></app-content-form>
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
export class AddContentComponent {}
