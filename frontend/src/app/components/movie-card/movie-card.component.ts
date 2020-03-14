import { Observable } from 'rxjs';
import { MoviesService } from './../../services/movies.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: any;
  posterImage: any;
  genresList: any = [];

  genresSubscription: any;
  posterSubscription: any;
  backdropSubscription: any;

  constructor(private movieService: MoviesService, private sanitizer:DomSanitizer, private router: Router) { }

  ngOnInit(): void {
    this.movie['release_date'] = this.formatDate(this.movie['release_date']);
    if (this.movie['release_date'].length != 10) {
      this.movie['release_date'] = "";
    }
    this.getGenres({ids: this.movie['genre_ids']});
    if (this.movie['poster_path']) {
      this.getPoster(this.movie['poster_path']);
    } else if(this.movie['backdrop_path']) {
      this.getBackdrop(this.movie['backdrop_path']);
    }
    
  }

  transform(imageBase64){
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageBase64);
  }

  formatDate(date: string) {
    if (date && date.length > 0) {
      return date.substring(5,7)+'/'+date.substring(8,10)+'/'+date.substring(0,4);
    }
    return '';
    
  }

  getGenres(ids) {
    this.genresSubscription = this.movieService.getMovieGenres(ids);
    this.genresSubscription.subscribe(res => {
      if (res['code'] == 200) {
        this.genresList = res['data'];
      } else {
        this.genresList = [];
      }
    });
  }

  getPoster(imageLink: string) {

    if (!imageLink) {
      return '';
    }

    this.posterSubscription = this.movieService.getMoviePoster(imageLink);
    this.posterSubscription.subscribe(res => {
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

    this.backdropSubscription = this.movieService.getMovieBackdrop(imageLink);
    this.backdropSubscription.subscribe(res => {
      if (res['code'] == 200) {
        this.posterImage = this.transform("data:image/jpg;base64, " + res['data']);
      } else {
        console.log("Failure in the backdrop movie request");
      }
    });

  }

  onClick(movie) {
    this.router.navigate(['/movies', movie['id']]);
  }

}
