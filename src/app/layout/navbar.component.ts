import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <div class="navbar">
      <div class="navbar__title">Watchlists</div>
      <nav class="navbar__nav">
        <ul class="navbar__list">
          <li class="navbar__item">
            <app-navlink path="/">Home</app-navlink>
          </li>
          <li class="navbar__item">
            <app-navlink path="/content/add">Create content</app-navlink>
          </li>
        </ul>
      </nav>
    </div>
  `,
  styles: [
    `
      .navbar {
        background-color: var(--color-dark);
        min-height: 100vh;
        padding: 1.5rem;
        &__title {
          color: var(--color-primary);
          text-align: center;
          font-size: 4rem;
          font-weight: bold;
        }
        &__list {
          margin-top: 2rem;
          list-style-type: none;
        }
      }
    `,
  ],
})
export class NavbarComponent {}
