import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { ProductService } from '../../services/single-item.service';
import { Observable, forkJoin, switchMap, map } from 'rxjs';
import { IItem } from '../../../../shared/models/item.model';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'id', width: 70 },
    { headerName: 'Title', field: 'title', width: 250 },
    { headerName: 'Price', field: 'price', width: 100 },
    { headerName: 'Quantity', field: 'quantity', width: 100 },
    { headerName: 'Image', field: 'image', width: 150, cellRenderer: this.imageRenderer }
  ];

  rowData$: Observable<{ id: number; title: string; price: number; quantity: number; image: string }[]> | undefined;
  total$: Observable<number> | undefined;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId !== null) {
      this.rowData$ = this.cartService.getUserCart(userId).pipe(
        switchMap(cartItems => {
          const productRequests = cartItems.map(item =>
            this.productService.getProductDetailsById(item.productId).pipe(
              map((product: IItem) => ({
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: item.quantity,
                image: product.image
              }))
            )
          );
          return forkJoin(productRequests);
        })
      );

      // Calculate the total price
      this.total$ = this.rowData$.pipe(
        map(items => items.reduce((total, item) => total + item.price * item.quantity, 0))
      );
    } else {
      console.error('User ID not found');
    }
  }

  imageRenderer(params: any): string {
    return `<img src="${params.value}" width="100" height="100" style="object-fit: contain;">`;
  }
}
