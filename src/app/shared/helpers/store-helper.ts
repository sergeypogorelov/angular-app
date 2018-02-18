import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

export const _PENDING = '_PENDING';
export const _FULFILLED = '_FULFILLED';
export const _REJECTED = '_REJECTED';

export class StoreHelper {
    static dispatch<T1, T2>(store: Store<T1>, actionPayload: Observable<T2>, actionType: string): Subscription {
        if (!store)
            throw new Error('Store is not specified.');

        if (!actionPayload)
            throw new Error('Action payload is not specified.');

        if (!actionType)
            throw new Error('Action type is not specified.');

        store.dispatch({ type: actionType + _PENDING });
        return actionPayload.subscribe(items => {
            store.dispatch({ type: actionType + _FULFILLED, payload: items });
        }, error => {
            store.dispatch({ type: actionType + _REJECTED, payload: error });
        });
    }
}
