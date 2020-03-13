import { MoviesService } from './../../services/movies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies-panel',
  templateUrl: './movies-panel.component.html',
  styleUrls: ['./movies-panel.component.scss']
})
export class MoviesPanelComponent implements OnInit {

  currentPage: number = 1;
  movies: [] = [];

  constructor(private movieService: MoviesService) { }

  ngOnInit(): void {

    this.getUpcomingMovies();

  }

  getUpcomingMovies(page: number = 1) {
    
    if (page != 1) {
      this.currentPage = page;
    }

    const moviesObservable = this.movieService.getUpcomingMovies(page);
    moviesObservable.subscribe(res => {
      if (res['code'] == 200) {
        this.movies = res['data']['results'];
      } else {
        console.log("Fail in the upcoming movies request");
      }
    });
  }

}
