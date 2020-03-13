import { MoviesService } from './../../services/movies.service';
import { Component, OnInit } from '@angular/core';
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

  constructor(private movieService: MoviesService) { }

  ngOnInit(): void {

    this.getUpcomingMovies();

  }

  getUpcomingMovies(page: number = 1) {
    const moviesObservable = this.movieService.getUpcomingMovies(page);
    moviesObservable.subscribe(res => {
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
    this.getUpcomingMovies(pageNum);
  }

}
