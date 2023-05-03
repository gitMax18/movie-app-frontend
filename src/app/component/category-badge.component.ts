import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-badge',
  template: ` <span class="badge">{{ category }}</span> `,
  styles: [
    `
      .badge {
        padding: 0.5rem 1rem;
        color: var(--color-light);
        background-color: var(--color-primary);
        border-radius: var(--main-radius);
      }
    `,
  ],
})
export class CategoryBadgeComponent {
  @Input() category?: string;
}
