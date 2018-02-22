import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { StoreHelper } from '../shared/helpers/store-helper';

import { LOAD_MOVIES, REMOVE_MOVIE, SHOW_REMOVAL_MODAL, HIDE_REMOVAL_MODAL } from '../shared/reducers/movies-reducer';

import { AppState } from '../shared/interfaces/app-state';
import { MoviesState } from '../shared/interfaces/movies-state';
import { MoviesService } from '../shared/services/movies/movies.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {

  searchForm: FormGroup = null;
  moviesState: MoviesState = null;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _store: Store<AppState>,
    private _moviesService: MoviesService) { }

  ngOnInit() {
    this._subscriptions.push(
      this._store
        .select(state => state.moviesState)
        .subscribe(moviesState => {
          this.moviesState = moviesState;
        })
    );

    this._subscriptions.push(
      this._route.queryParams.subscribe(queryParams => {
        this.initSearchForm(queryParams);
        this.loadMovies();
      })
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(i => i.unsubscribe());
  }

  submitSearchForm() {
    let title = this.searchForm.controls['title'].value;
    this._router.navigate(['/courses'], { queryParams: { title } });
  }

  removeCourse(id) {
    if (typeof id === 'number' && !isNaN(id)) {
      this._movieToRemoveId = id;
      this._store.dispatch({ type: SHOW_REMOVAL_MODAL });
    }
  }

  confirmRemoval() {
    this._subscriptions.push(
      StoreHelper.dispatch(this._store, this._moviesService.removeById(this._movieToRemoveId), REMOVE_MOVIE)
    );
    this.cancelRemoval();
  }

  cancelRemoval() {
    this._movieToRemoveId = null;
    this._store.dispatch({ type: HIDE_REMOVAL_MODAL });
  }

  private _subscriptions: Subscription[] = [];
  private _movieToRemoveId: number = null;

  private initSearchForm(queryParams) {
    if (queryParams) {
      this.searchForm = this._fb.group({
        title: [queryParams['title']]
      });
    }
  }

  private loadMovies() {
    let title = this.searchForm.controls['title'].value;
    this._subscriptions.push(
      StoreHelper.dispatch(this._store, this._moviesService.loadMovies(title), LOAD_MOVIES)
    );
  }

}
