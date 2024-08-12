import { createAction, props } from '@ngrx/store';
import { IItem } from '../../../shared/models/item.model';

export const loadItems = createAction('[Item] Load Items');
export const loadItemsSuccess = createAction(
  //this is the action that will be dispatched when the items are loaded successfully
  '[Item] Load Items Success',
  props<{ items: IItem[] }>()
);
export const loadItemsFailure = createAction(
  //this is the action that will be dispatched when the items are not loaded successfully
  '[Item] Load Items Failure',
  props<{ error: any }>()
);
