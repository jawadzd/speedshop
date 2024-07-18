import { Component ,OnInit} from '@angular/core';
import { ItemService } from '../../features/product-listing/services/item.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.scss'
})
export class ProductListingComponent implements OnInit {
  title = 'speedshop';


  constructor(private itemService: ItemService) {}
  items: any[] = [];
  ngOnInit(){
    this.itemService.getItems().subscribe(items => {
      this.items=items;
  });
  }
}