import { createAction, props } from '@ngrx/store';
import { IItem } from '../../../shared/models/item.model';

export const loadItems = createAction('[Item] Load Items');
export const loadItemsSuccess = createAction(
  '[Item] Load Items Success',
  props<{ items: IItem[] }>()
);
export const loadItemsFailure = createAction(
  '[Item] Load Items Failure',
  props<{ error: any }>()
);
