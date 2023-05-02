import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="app">
    <app-navbar class="app__navbar"></app-navbar>
    <div class="app__page">
      <router-outlet></router-outlet>
    </div>
  </div>
  `,
  styles: [`
  .app{
    width : 100%;
   display : flex;
   &__navbar{
    position : fixed;
    right : 0;
    left : 0;
    width : 25rem;
   }
    &__page{
      margin-left : 25rem;
      width : 100%;
      flex-grow : 1;
    }
  }
  `]
})
export class AppComponent {
}
