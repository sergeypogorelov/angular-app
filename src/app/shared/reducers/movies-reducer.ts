import { Action, ActionReducer } from '@ngrx/store';

import { MoviesState } from '../interfaces/movies-state';
import { DefaultAction } from '../interfaces/default-action';

import { _PENDING, _FULFILLED, _REJECTED } from '../helpers/store-helper';

const INITIAL_STATE: MoviesState = {
    movies: [],
    moviesAreLoading: false,
    moviesAreLoaded: false,
    moviesAreNotLoaded: false,
    showRemovalModal: false
};

export const LOAD_MOVIES = 'LOAD_MOVIES';
export const REMOVE_MOVIE = 'REMOVE_MOVIE';
export const SHOW_REMOVAL_MODAL = 'SHOW_REMOVAL_MODAL';
export const HIDE_REMOVAL_MODAL = 'HIDE_REMOVAL_MODAL';

export const moviesReducer: ActionReducer<MoviesState> = (store: MoviesState = INITIAL_STATE, action: DefaultAction) => {
    switch(action.type) {

        case LOAD_MOVIES + _PENDING:
            return {
                ...store,
                moviesAreLoading: true,
                moviesAreLoaded: false,
                moviesAreNotLoaded: false
            };

        case LOAD_MOVIES + _FULFILLED:
            return {
                ...store,
                movies: action.payload,
                moviesAreLoading: false,
                moviesAreLoaded: true,
                moviesAreNotLoaded: false
            };

        case LOAD_MOVIES + _REJECTED:
            return {
                ...store,
                moviesAreLoading: false,
                moviesAreLoaded: false,
                moviesAreNotLoaded: true
            };


        case REMOVE_MOVIE + _PENDING:
            return {
                ...store,
                moviesAreLoading: true,
                moviesAreLoaded: false,
                moviesAreNotLoaded: false
            };

        case REMOVE_MOVIE + _FULFILLED:
            return {
                ...store,
                movies: action.payload,
                moviesAreLoading: false,
                moviesAreLoaded: true,
                moviesAreNotLoaded: false
            };

        case REMOVE_MOVIE + _REJECTED:
            return {
                ...store,
                moviesAreLoading: false,
                moviesAreLoaded: false,
                moviesAreNotLoaded: true
            };
        
        case SHOW_REMOVAL_MODAL:
            return {
                ...store,
                showRemovalModal: true
            };

        case HIDE_REMOVAL_MODAL:
            return {
                ...store,
                showRemovalModal: false
            };

        default:
            return store;
    }
};
