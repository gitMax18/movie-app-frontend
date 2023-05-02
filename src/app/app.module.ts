import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar.component';
import { NavlinkComponent } from './component/navlink.component';
import { HomeComponent } from './pages/home.component';
import { MovieDetailComponent } from './pages/movie-detail.component';
import { ContentCardComponent } from './component/content-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavlinkComponent,
    HomeComponent,
    MovieDetailComponent,
    ContentCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
