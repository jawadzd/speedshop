import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from './services/item.service';
import { IItem } from '../../shared/models/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  item: IItem | null = null;
  showGoToCartButton = false;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      this.itemService.getItemById(+itemId).subscribe((item) => {
        this.item = item;
      });
    }
  }

  handleItemCountChange(count: number) {
    this.showGoToCartButton = count > 0;
  }

  goToCart() {
    this.router.navigate(['/cart']); // Adjust the path based on your routing setup
  }

  goToMainPage() {
    this.router.navigate(['/']); // Adjust the path based on your routing setup
  }
}
