import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar.component';
import { NavlinkComponent } from './component/navlink.component';
import { HomeComponent } from './pages/home.component';
import { MovieDetailComponent } from './pages/movie-detail.component';
import { ContentCardComponent } from './component/content-card.component';
import { AddContentComponent } from './pages/add-content.component';
import { ContentFormComponent } from './component/content-form.component';
import { PageTitleComponent } from './component/page-title.component';
import { ButtonComponent } from './component/button.component';
import { SelectCategoriesComponent } from './component/select-categories.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavlinkComponent,
    HomeComponent,
    MovieDetailComponent,
    ContentCardComponent,
    AddContentComponent,
    ContentFormComponent,
    PageTitleComponent,
    ButtonComponent,
    SelectCategoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
