import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';

import { searchKey, searchReducer } from './search.reducers';
import { ISearchState } from '../state.models';

export interface State {
  [searchKey]: ISearchState;
}

export const reducers: ActionReducerMap<State> = {
  [searchKey]: searchReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
