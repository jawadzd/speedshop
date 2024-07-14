import { Component ,OnInit} from '@angular/core';
import { ItemService } from './features/product-listing/services/item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'speedshop';


  constructor(private itemService: ItemService) {}
  items: any[] = [];
  ngOnInit(){
    this.itemService.getItems().subscribe(items => {
      this.items=items;
  });
  }
}
