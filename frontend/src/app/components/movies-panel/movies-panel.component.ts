import { SearchService } from './../../services/search.service';
import { MoviesService } from './../../services/movies.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-movies-panel',
  templateUrl: './movies-panel.component.html',
  styleUrls: ['./movies-panel.component.scss']
})
export class MoviesPanelComponent implements OnInit {

  currentPage: number = 0;
  generalData: any;
  movies: [] = [];
  pageEvent: PageEvent;
  lastSearch: string = '';

  upComingMoviesSubscription: any;
  searchMovieSubscription: any;
  inSearch: boolean = false;



  constructor(private movieService: MoviesService, private searchService: SearchService) { 

    this.searchService.search$.subscribe(
      res => {
        if (res && res != this.lastSearch) {
          this.inSearch = true;
          this.generalData = null;
          this.lastSearch = res;
          this.searchMovie(1, this.lastSearch);
        } else if (res == null || res === '') {
          this.inSearch = false;
          if (this.lastSearch) {
            this.generalData = null;
            this.getUpcomingMovies();
            this.lastSearch = '';
          }
          
        }
      });

  }


  ngOnInit(): void {

    this.getUpcomingMovies();

  }

  getUpcomingMovies(page: number = 1) {
    this.upComingMoviesSubscription = this.movieService.getUpcomingMovies(page);
    this.upComingMoviesSubscription.subscribe(res => {
      if (res['code'] == 200) {
        if (this.generalData) {
          if(page != this.generalData['total_pages']) {
            this.generalData = res['data'];
          }
        } else {
          this.generalData = res['data'];
        }
        this.movies = res['data']['results'];
      } else {
        console.log("Fail in the upcoming movies request");
      }
    });
  }

  searchMovie(page: number = 1, movie: string) {
    this.searchMovieSubscription = this.movieService.searchMovies(movie, page);
    this.searchMovieSubscription.subscribe(res => {
      if (res['code'] == 200) {
        if (this.generalData) {
          if(page != this.generalData['total_pages']) {
            this.generalData = res['data'];
          }
        } else {
          this.generalData = res['data'];
        }
        this.movies = res['data']['results'];
      } else {
        console.log("Fail in the upcoming movies request");
      }
    });
  }

  public onPageChange(pageNum: number): void {
    if (this.inSearch) {
      this.searchMovie(pageNum, this.lastSearch);
    } else {
      this.getUpcomingMovies(pageNum);
    }
  }

}
