import { Component } from '@angular/core';

@Component({
  selector: 'app-form-layout',
  template: `
    <div class="formLayout">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .formLayout {
        max-width: 100rem;
        margin: 0 auto;
      }
    `,
  ],
})
export class FormLayoutComponent {}
