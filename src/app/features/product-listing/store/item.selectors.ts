import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemState } from './/item.reducer';

export const selectItemState = createFeatureSelector<ItemState>('itemState');

export const selectAllItems = createSelector(
  selectItemState,
  (state: ItemState) => state.items
);

export const selectItemError = createSelector(
  selectItemState,
  (state: ItemState) => state.error
);
