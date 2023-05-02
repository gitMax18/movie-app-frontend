import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { MovieDetailComponent } from './pages/movie-detail.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "movie/:id", component: MovieDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
