import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { StoreHelper } from '../shared/helpers/store-helper';

import { LOAD_MOVIES } from '../shared/reducers/movies-reducer';
import { MoviesService } from '../shared/services/movies/movies.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  moviesStore = null;

  constructor(private _store: Store<any>, private _moviesService: MoviesService) { }

  ngOnInit() {
    this._store
      .select<any>('movies')
      .subscribe(moviesStore => {
        this.moviesStore = moviesStore;
      });

    StoreHelper.dispatch(LOAD_MOVIES, this._moviesService.loadMovies(), this._store);
  }

}
