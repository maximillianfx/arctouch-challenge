import { MoviesService } from './../../services/movies.service';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: any;
  posterImage: any;
  backdropImage: string;

  constructor(private movieService: MoviesService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.movie['release_date'] = this.formatDate(this.movie['release_date']);
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
    return date.substring(5,7)+'/'+date.substring(8,10)+'/'+date.substring(0,4);
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
        console.log("Fail in the poster movie request");
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
        this.posterImage = this.transform("data:image/jpg;base64, " + res['data']);
      } else {
        console.log("Fail in the poster movie request");
      }
    });

  }

}
