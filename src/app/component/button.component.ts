import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button [type]="type" class="button">
      <ng-content></ng-content>
    </button>
  `,
  styles: [
    `
      .button {
        display: block;
        font-weight: bold;
        font-size: 1.8rem;
        width: 100%;
        padding: 1rem 2rem;
        border: none;
        border-radius: var(--main-radius);
        color: var(--color-light);
        background-color: var(--color-primary);
        cursor: pointer;
        &:hover {
          background-color: var(--color-primary-darken);
        }
      }
    `,
  ],
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
}
