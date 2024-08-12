import { createReducer, on } from '@ngrx/store';
import { loadItems, loadItemsSuccess, loadItemsFailure } from './item.actions';
import { IItem } from '../../../shared/models/item.model';

export interface ItemState {
  items: IItem[];
  error: any;
}

export const initialState: ItemState = {
  items: [],
  error: null,
};
//this is the reducer that will handle the state of the items
export const itemReducer = createReducer(
  initialState,
  on(loadItems, (state) => ({ ...state })),
  on(loadItemsSuccess, (state, { items }) => ({ ...state, items })),
  on(loadItemsFailure, (state, { error }) => ({ ...state, error }))
);
