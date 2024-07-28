import { Component ,OnInit} from '@angular/core';
import { Store ,select } from '@ngrx/store';
import { loadItems } from './store/item.actions';
import { Observable } from 'rxjs';
import { IItem } from './models/item.model';
import { ItemState } from './store/item.reducer';


@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.scss'
})
export class ProductListingComponent implements OnInit {
  title = 'speedshop';
  items$: Observable<IItem[]>;



  constructor(private store: Store<{ itemState: ItemState }>) {
    this.items$ = store.pipe(select(state => state.itemState.items));
  }
  items: any[] = [];
  ngOnInit(){
    this.store.dispatch(loadItems());
  }
}