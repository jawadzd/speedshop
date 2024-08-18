import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ItemService } from '../services/item.service';
import {
  loadItems,
  loadItemsSuccess,
  loadItemsFailure,
  loadElectronics,
  loadJewelry,
  loadMensClothing,
  loadWomensClothing,
} from './item.actions';
import { IItem } from '../../../shared/models/item.model';

@Injectable()
export class ItemEffects {
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadItems),
      mergeMap(() =>
        this.itemService.getItems().pipe(
          map((items: IItem[]) => loadItemsSuccess({ items })),
          catchError((error) => of(loadItemsFailure({ error })))
        )
      )
    )
  );

  loadElectronics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadElectronics),
      mergeMap(() =>
        this.itemService.getelec().pipe(
          map((items: IItem[]) => loadItemsSuccess({ items })),
          catchError((error) => of(loadItemsFailure({ error })))
        )
      )
    )
  );

  loadJewelry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadJewelry),
      mergeMap(() =>
        this.itemService.getjew().pipe(
          map((items: IItem[]) => loadItemsSuccess({ items })),
          catchError((error) => of(loadItemsFailure({ error })))
        )
      )
    )
  );

  loadMensClothing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMensClothing),
      mergeMap(() =>
        this.itemService.getmen().pipe(
          map((items: IItem[]) => loadItemsSuccess({ items })),
          catchError((error) => of(loadItemsFailure({ error })))
        )
      )
    )
  );

  loadWomensClothing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWomensClothing),
      mergeMap(() =>
        this.itemService.getwomen().pipe(
          map((items: IItem[]) => loadItemsSuccess({ items })),
          catchError((error) => of(loadItemsFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private itemService: ItemService) {}
}
