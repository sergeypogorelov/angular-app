import { Action } from '@ngrx/store';

export interface DefaultAction extends Action {
    payload?: any;
}