import { SearchService } from './services/search.service';
import { MoviesService } from './services/movies.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { MoviesPanelComponent } from './components/movies-panel/movies-panel.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';







@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailComponent,
    InputSearchComponent,
    MoviesPanelComponent,
    MovieCardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule
  ],
  providers: [MoviesService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
