import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { MovieDetailComponent } from './pages/movie-detail.component';
import { AddContentComponent } from './pages/add-content.component';
import { UpdateContentComponent } from './pages/update-content.component';
import { LoginComponent } from './pages/login.component';
import { RegisterComponent } from './pages/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'content/add', component: AddContentComponent },
  { path: 'content/:id', component: MovieDetailComponent },
  { path: 'content/update/:id', component: UpdateContentComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
