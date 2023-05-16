import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      [class.button__primary]="style === 'primary'"
      [class.button__danger]="style === 'danger'"
      [class.button__success]="style === 'success'"
      (click)="handleClick()"
      [type]="type"
      class="button"
    >
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
        cursor: pointer;
        &__primary {
          background-color: var(--color-primary);
        }
        &__danger {
          background-color: var(--color-danger);
        }
        &__success {
          background-color: var(--color-success);
        }
      }
    `,
  ],
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() style: 'primary' | 'danger' | 'success' = 'primary';
  @Output() onClick = new EventEmitter();

  handleClick() {
    this.onClick.emit();
  }
}
