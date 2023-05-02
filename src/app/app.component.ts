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
    width : 20%;
        max-width : 26rem;
      min-width : 20rem;
   }
    &__page{
      width : 100%;
      flex-grow : 1;
    }
  }
  `]
})
export class AppComponent {
}
