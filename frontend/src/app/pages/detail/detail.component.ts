import { MoviesService } from './../../services/movies.service';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  idMovie: number;
  movie: any;
  posterImage: any;
  backdropImage: any;
  genresList: any = [];
  genres: string;

  constructor(private movieService: MoviesService, private sanitizer: DomSanitizer, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getMovieDetail(params['id']);
    });

  }

  getMovieDetail(idMovie) {
    const moviesObservable = this.movieService.getMovieByID(idMovie);
    moviesObservable.subscribe(res => {
      if (res['code'] == 200) {
        this.movie = res['data'];
        this.movie['release_date'] = this.formatDate(this.movie['release_date']);
        this.formatGenresList(this.movie['genres']);
        this.getMovieImage();
      } else {
        console.log("Failure in the movie detail request");
      }
    });
  }

  getMovieImage() {
    if (this.movie['poster_path']) {
      this.getPoster(this.movie['poster_path']);
    } else if (this.movie['backdrop_path']) {
      this.getBackdrop(this.movie['backdrop_path']);
    }
  }

  getPoster(imageLink: string) {

    if (!imageLink) {
      return '';
    }

    const moviesObservable = this.movieService.getMoviePoster(imageLink);
    moviesObservable.subscribe(res => {
      if (res['code'] == 200) {
        this.posterImage = this.transform("data:image/jpg;base64, " + res['data']);
      } else {
        console.log("Failure in the poster movie request");
      }
    });

  }

  getBackdrop(imageLink: string) {

    if (!imageLink) {
      return '';
    }

    const moviesObservable = this.movieService.getMovieBackdrop(imageLink);
    moviesObservable.subscribe(res => {
      if (res['code'] == 200) {
        this.backdropImage = this.transform("data:image/jpg;base64, " + res['data']);
      } else {
        console.log("Failure in the backdrop movie request");
      }
    });

  }

  transform(imageBase64) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageBase64);
  }

  formatDate(date: string) {
    return date.substring(5, 7) + '/' + date.substring(8, 10) + '/' + date.substring(0, 4);
  }

  formatGenresList(genres) {

    var formatedArray = genres.map((value) => {
      return value.name;
    });
    this.genres = formatedArray.join(', ')

  }

}
