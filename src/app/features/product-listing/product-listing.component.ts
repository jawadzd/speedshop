import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadItems } from './store/item.actions';
import { Observable, Subscription } from 'rxjs';
import { IItem } from '../../shared/models/item.model';
import { ItemState } from './store/item.reducer';
import { selectAllItems } from './store/item.selectors';
import { KeyboardControlService } from '../../shared/services/keyboard-control.service';
import { Router } from '@angular/router';
//this component is the main product listingg component it will show all the data with the needed filters and search criteria
@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit, OnDestroy {
  title = 'speedshop';
  items$: Observable<IItem[]>;
  selectedItemIndex: number = 0;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store<{ itemState: ItemState }>,
    private keyboardControlService: KeyboardControlService,
    private router: Router
  ) {
    this.items$ = this.store.pipe(select(selectAllItems));
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
      //this is for the enter key to select the item
      this.keyboardControlService.enterKey$.subscribe(() => {
        this.selectCurrentItem();
      })
    );
  }

  ngOnDestroy(): void {
    //unsubscribe from the subscriptions when the component is destroyed
    this.subscriptions.unsubscribe();
  }

  //these are keyboard settings for the navigation in the product listing page
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
