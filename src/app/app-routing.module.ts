import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { MovieDetailComponent } from './pages/movie-detail.component';
import { AddContentComponent } from './pages/add-content.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "content/add", component: AddContentComponent },
  { path: "content/:id", component: MovieDetailComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
