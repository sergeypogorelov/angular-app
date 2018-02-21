import { Movie } from '../entities/movie';

export interface MoviesState {
    movies: Movie[];
    moviesAreLoading: boolean;
    moviesAreLoaded: boolean;
    moviesAreNotLoaded: boolean;
    showRemovalModal: boolean;
}