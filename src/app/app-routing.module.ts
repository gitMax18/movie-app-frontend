import { NgModule, inject } from '@angular/core';
import { CanActivateFn, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { MovieDetailComponent } from './pages/movie-detail.component';
import { AddContentComponent } from './pages/add-content.component';
import { UpdateContentComponent } from './pages/update-content.component';
import { LoginComponent } from './pages/login.component';
import { RegisterComponent } from './pages/register.component';
import { AuthService } from './service/auth.service';
import { take } from 'rxjs';

// guards
function requireAuth(): CanActivateFn {
  return () => {
    let isAuthenticated = false;
    inject(AuthService)
      .isAuthenticated$.pipe(take(1))
      .subscribe((bol) => (isAuthenticated = bol));

    return isAuthenticated;
  };
}

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'content/add',
    component: AddContentComponent,
    canActivate: [requireAuth()],
  },
  { path: 'content/:id', component: MovieDetailComponent },
  {
    path: 'content/update/:id',
    component: UpdateContentComponent,
    canActivate: [requireAuth()],
  },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
