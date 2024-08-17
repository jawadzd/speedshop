import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadItems } from './store/item.actions';
import { Observable, Subscription } from 'rxjs';
import { IItem } from '../../shared/models/item.model';
import { ItemState } from './store/item.reducer';
import { selectAllItems } from './store/item.selectors';
import { KeyboardControlService } from '../../shared/services/keyboard-control.service';
import { Router } from '@angular/router';
import { SearchService } from '../../shared/services/search.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit, OnDestroy {
  title = 'speedshop';
  items$: Observable<IItem[]>;
  filteredItems$: Observable<IItem[]>;
  selectedItemIndex: number = 0;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store<{ itemState: ItemState }>,
    private searchService: SearchService,
    private keyboardControlService: KeyboardControlService,
    private router: Router
  ) {
    this.items$ = this.store.pipe(select(selectAllItems));

    this.filteredItems$ = this.searchService.searchQuery$.pipe(
      switchMap(query =>
        this.items$.pipe(
          map(items => {
            const filtered = items.filter(item =>
              item.title.toLowerCase().includes(query.toLowerCase())
            );
            return filtered;
          })
        )
      )
    );
  }

  ngOnInit() {
    this.store.dispatch(loadItems());

    this.subscriptions.add(
      this.keyboardControlService.arrowKey$.subscribe((key) => {
        if (key === 'ArrowRight') {
          this.selectNextItem();
        } else if (key === 'ArrowLeft') {
          this.selectPreviousItem();
        }
      })
    );

    this.subscriptions.add(
      this.keyboardControlService.enterKey$.subscribe(() => {
        this.selectCurrentItem();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  selectNextItem(): void {
    this.items$.subscribe((items) => {
      if (this.selectedItemIndex < items.length - 1) {
        this.selectedItemIndex++;
      }
    });
  }

  selectPreviousItem(): void {
    if (this.selectedItemIndex > 0) {
      this.selectedItemIndex--;
    }
  }

  selectCurrentItem(): void {
    this.items$.subscribe((items) => {
      const selectedItem = items[this.selectedItemIndex];
      this.router.navigate(['/shell/feature/item', selectedItem.id]);
    });
  }

  onCardClick(index: number): void {
    this.selectedItemIndex = index;
  }

  trackByItemId(index: number, item: IItem): number {
    return item.id;
  }

  goToItem(id: number): void {
    this.router.navigate(['/shell/feature/item', id]);
  }

  onDoubleClick(id: number): void {
    this.goToItem(id);
  }
}
