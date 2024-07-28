import { Component ,OnInit,OnDestroy} from '@angular/core';
import { Store ,select } from '@ngrx/store';
import { loadItems } from './store/item.actions';
import { Observable ,Subscription} from 'rxjs';
import { IItem } from './models/item.model';
import { ItemState } from './store/item.reducer';
import { selectAllItems } from './store/item.selectors';
import { KeyboardControlService } from '../../shared/services/keyboard-control.service';


@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.scss'
})
export class ProductListingComponent implements OnInit ,OnDestroy{
  title = 'speedshop';
  items$: Observable<IItem[]>;
  selectedItemIndex: number = 0;
  private subscriptions: Subscription = new Subscription();



  constructor(private store: Store<{ itemState: ItemState }>, private keyboardControlService: KeyboardControlService) {
    this.items$ = this.store.pipe(select(selectAllItems));
  }

  ngOnInit(){
    this.store.dispatch(loadItems());
  
    

    this.subscriptions.add(
      this.keyboardControlService.arrowKey$.subscribe(key => {
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
    this.items$.subscribe(items => {
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
    this.items$.subscribe(items => {
      const selectedItem = items[this.selectedItemIndex];
      // Perform the desired action with the selected item, e.g., navigate to its detail page
      console.log('Selected Item:', selectedItem);
    });
  }
  

  trackByItemId(index: number, item: IItem): number {
    return item.id;
  }

}