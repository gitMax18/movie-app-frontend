import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navlink',
  template: `
    <a
      class="navlink"
      [routerLinkActiveOptions]="{ exact: true }"
      [routerLink]="path"
      routerLinkActive="navlink--active"
    >
      <ng-content></ng-content>
    </a>
  `,
  styles: [
    `
      .navlink {
        display: block;
        color: var(--color-light);
        font-weight: bold;
        text-decoration: none;
        padding: 1rem;
        border-radius: var(--main-radius);
        &--active {
          background-color: var(--color-primary);
        }
      }
    `,
  ],
})
export class NavlinkComponent {
  @Input() path?: string;
}
