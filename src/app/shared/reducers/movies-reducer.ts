import { Action, ActionReducer } from '@ngrx/store';

const INITIAL_STORE = {
    movies: [],
    moviesAreLoading: false,
    moviesAreLoaded: false,
    moviesAreNotLoaded: false
};

export const LOAD_MOVIES = 'load_movies';
export const LOAD_MOVIES_PENDING = 'load_movies_pending';
export const LOAD_MOVIES_FULFILLED = 'load_movies_fulfilled';
export const LOAD_MOVIES_REJECTED = 'load_movies_rejected';

export const moviesReducer: ActionReducer<any> = (store: any = INITIAL_STORE, action: any) => {
    switch(action.type) {
        case LOAD_MOVIES_PENDING:
            return {
                ...store,
                moviesAreLoading: true,
                moviesAreLoaded: false,
                moviesAreNotLoaded: false
            };
        case LOAD_MOVIES_FULFILLED:
            return {
                ...store,
                movies: action.payload,
                moviesAreLoading: false,
                moviesAreLoaded: true,
                moviesAreNotLoaded: false
            };
        case LOAD_MOVIES_REJECTED:
            return {
                ...store,
                moviesAreLoading: false,
                moviesAreLoaded: false,
                moviesAreNotLoaded: true
            };
        default:
            return store;
    }
};