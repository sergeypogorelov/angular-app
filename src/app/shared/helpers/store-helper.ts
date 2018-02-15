import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

export class StoreHelper {
    static dispatch<T1, T2>(actionType: string, actionPayload: Observable<T1>, store: Store<T2>): void {
        if (!store)
            throw new Error('Store is not specified.');

        if (!actionType)
            throw new Error('Action type is not specified.');

        if (!actionPayload)
            throw new Error('Action payload is not specified.');

        store.dispatch({ type: `${actionType}_pending` });
        actionPayload.subscribe(items => {
            store.dispatch({ type: `${actionType}_fulfilled`, payload: items });
        }, error => {
            store.dispatch({ type: `${actionType}_rejected`, payload: error });
        });
    }
}
