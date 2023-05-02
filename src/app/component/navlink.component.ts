import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navlink',
  template: `
    <a class="navlink" [routerLink]="path" routerLinkActive="navlink--active">
      <ng-content></ng-content>
    </a>
  `,
  styles: [
    `
    .navlink {
      display : block;
      color : var(--color-light);
      text-decoration : none;
      padding : 1rem;
      border-radius : var(--main-radius);
      &--active{
        background-color : var(--color-grey);
      }
    }
    `
  ]
})
export class NavlinkComponent {
  @Input() path?: string;
}
