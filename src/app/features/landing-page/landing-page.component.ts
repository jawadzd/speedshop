import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadItems } from '../product-listing/store/item.actions';
import { Observable, Subscription } from 'rxjs';
import { IItem } from '../../shared/models/item.model';
import { ItemState } from '../product-listing/store/item.reducer';
import { selectAllItems } from '../product-listing/store/item.selectors';
import { KeyboardControlService } from '../../shared/services/keyboard-control.service';
import { Router } from '@angular/router';
import { SearchService } from '../../shared/services/search.service';
import { map, switchMap } from 'rxjs/operators';

//the app landing page component the first page that the user will see
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  items$: Observable<IItem[]>;
  filteredItems$: Observable<IItem[]>;
  selectedItemIndex: number = 0;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store<{ itemState: ItemState }>,
    private keyboardControlService: KeyboardControlService,
    private searchService: SearchService,
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
    //load the items when the component is initialized
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
    //unsubscribe from the subscriptions when the component is destroyed
    this.subscriptions.unsubscribe();
  }
  //these are for navigation in the landing page through the keyboard
  selectNextItem(): void {
    //select the next item
    this.items$.subscribe((items) => {
      if (this.selectedItemIndex < items.length - 1) {
        this.selectedItemIndex++;
      }
    });
  }

  selectPreviousItem(): void {
    //select the previous item
    if (this.selectedItemIndex > 0) {
      this.selectedItemIndex--;
    }
  }

  selectCurrentItem(): void {
    //select the current item
    this.items$.subscribe((items) => {
      const selectedItem = items[this.selectedItemIndex];
      this.router.navigate(['/shell/feature/item', selectedItem.id]);
    });
  }

  onCardClick(index: number): void {
    //select the item when the card is clicked
    this.selectedItemIndex = index;
  }

  trackByItemId(index: number, item: IItem): number {
    //track the item by its id
    return item.id;
  }

  goToItem(id: number): void {
    //navigate to the item page
    this.router.navigate(['/shell/feature/item', id]);
  }

  onDoubleClick(id: number): void {
    //navigate to the item page when the card is double clicked
    this.goToItem(id);
  }
}
