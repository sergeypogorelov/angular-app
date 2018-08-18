import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import * as escapeStringRegexp from 'escape-string-regexp';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestMethod, RequestOptions, URLSearchParams } from '@angular/http';

import { Movie } from '../../entities/movie';

const API_URL = 'http://localhost:3000/movies';

@Injectable()
export class MoviesService {

  constructor(private _http: Http, private _store: Store<any>) { }

  loadMovieById(id: number): Observable<Movie> {
    if (id < 1)
      throw new Error('Specified ID is not valid.');

    let requestOptions = new RequestOptions();
    requestOptions.url = `${API_URL}/${id}`;
    requestOptions.method = RequestMethod.Get;
    
    let searchParams = new URLSearchParams();
    searchParams.set('_embed', 'authors');
    requestOptions.params = searchParams;

    let request = new Request(requestOptions);
    return this._http
      .request(request)
      .map((response: Response) => response.json())
      .map(movie => new Movie(movie));
  }

  loadMovies(title?: string): Observable<Movie[]> {
    let requestOptions = new RequestOptions();
    requestOptions.url = API_URL;
    requestOptions.method = RequestMethod.Get;
    
    let searchParams = new URLSearchParams();
    if (title) {
      searchParams.set('title_like', escapeStringRegexp(title));
    }
    searchParams.set('_embed', 'authors');
    requestOptions.params = searchParams;

    let request = new Request(requestOptions);
    return this._http
      .request(request)
      .map((response: Response) => response.json())
      .map(movies => movies.map(movie => new Movie(movie)));
  }

  removeById(id: number, title?: string): Observable<Movie[]> {
    if (id < 1)
      throw new Error('Specified ID is not valid.');

    return this._http
      .delete(`${API_URL}/${id}`)
      .mergeMap(() => this.loadMovies(title));
  }

}
