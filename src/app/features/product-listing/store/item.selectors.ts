import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemState } from './/item.reducer';

export const selectItemState = createFeatureSelector<ItemState>('itemState');

export const selectAllItems = createSelector(
  //this selector will select all the items from the state
  selectItemState,
  (state: ItemState) => state.items
);

export const selectItemError = createSelector(
  //this selector will select the error from the state
  selectItemState,
  (state: ItemState) => state.error
);
