import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient) { }

  public getUpcomingMovies(page: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const moviesUpcomingObservable = new Observable(observer => {
      this.httpClient.get(environment.url_base + 'upcoming?page=' + page, httpOptions)
        .subscribe(
          res => {
            observer.next(res);
          }, err => {
            observer.next(err);
          });
    });
    return moviesUpcomingObservable;

  }

  public getMovieByID(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const moviesUpcomingObservable = new Observable(observer => {
      this.httpClient.get(environment.url_base + id, httpOptions)
        .subscribe(
          res => {
            observer.next(res);
          }, err => {
            observer.next(err);
          });
    });
    return moviesUpcomingObservable;

  }

  public getMoviePoster(imageLink: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const moviesUpcomingObservable = new Observable(observer => {
      this.httpClient.get(environment.url_base_poster + imageLink, httpOptions)
        .subscribe(
          res => {
            observer.next(res);
          }, err => {
            observer.next(err);
          });
    });
    return moviesUpcomingObservable;

  }

  public getMovieGenres(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const moviesGenresObservable = new Observable(observer => {
      this.httpClient.post(environment.url_base_genre, body, httpOptions)
        .subscribe(
          res => {
            observer.next(res);
          }, err => {
            observer.next(err);
          });
    });
    return moviesGenresObservable;

  }

  public getMovieBackdrop(imageLink: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const moviesUpcomingObservable = new Observable(observer => {
      this.httpClient.get(environment.url_base_backdrop + imageLink, httpOptions)
        .subscribe(
          res => {
            observer.next(res);
          }, err => {
            observer.next(err);
          });
    });
    return moviesUpcomingObservable;

  }

  public searchMovies(search: string, page: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const moviesUpcomingObservable = new Observable(observer => {
      this.httpClient.get(environment.url_base + '?search=' + search + '&page=' + page, httpOptions)
        .subscribe(
          res => {
            observer.next(res);
          }, err => {
            observer.next(err);
          });
    });
    return moviesUpcomingObservable;

  }

}
