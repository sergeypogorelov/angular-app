import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { StoreHelper } from '../shared/helpers/store-helper';

import { LOAD_MOVIES } from '../shared/reducers/movies-reducer';

import { AppState } from '../shared/interfaces/app-state';
import { MoviesState } from '../shared/interfaces/movies-state';
import { MoviesService } from '../shared/services/movies/movies.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {

  moviesState: MoviesState = null;

  showRemoveModal: boolean = false;

  constructor(private _store: Store<AppState>, private _moviesService: MoviesService) { }

  ngOnInit() {
    this._subscriptions.push(
      this._store
        .select(state => state.moviesState)
        .subscribe(moviesState => {
          this.moviesState = moviesState;
        })
    );

    this._subscriptions.push(
      StoreHelper.dispatch(this._store, this._moviesService.loadMovies(), LOAD_MOVIES)
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(i => i.unsubscribe());
  }

  removeCourse(id) {
    if (typeof id === 'number' && !isNaN(id)) {
      this._movieToRemoveId = id;
      this.showRemoveModal = true;
    }
  }

  confirmRemoval() {
    console.log('remove', this._movieToRemoveId);

    this._movieToRemoveId = null;
    this.showRemoveModal = false;
  }

  cancelRemoval() {
    console.log('cancel removal', this._movieToRemoveId);

    this._movieToRemoveId = null;
    this.showRemoveModal = false;
  }

  private _subscriptions: Subscription[] = [];
  private _movieToRemoveId: number = null;

}
