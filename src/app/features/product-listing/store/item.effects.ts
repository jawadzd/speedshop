// src/app/store/effects/item.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ItemService } from '../services/item.service';
import { loadItems, loadItemsSuccess, loadItemsFailure } from './item.actions';
import { IItem } from '../models/item.model';

@Injectable()
export class ItemEffects {

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadItems),
      mergeMap(() =>
        this.itemService.getItems().pipe(
          map((items: IItem[]) => loadItemsSuccess({ items })),
          catchError(error => of(loadItemsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private itemService: ItemService
  ) {}
}
