import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { ProductService } from '../../services/single-item.service';
import { Observable, forkJoin, switchMap, map ,catchError,of } from 'rxjs';
import { IItem } from '../../../../shared/models/item.model';
import { ColDef} from 'ag-grid-community';
import { DeleteComponent } from '../../../../shared/components/grid_components/delete/delete.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  context = { componentParent: this };

  rowData: any[]=[];

  columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'id', width: 70 },
    { headerName: 'Title', field: 'title', width: 250 },
    { headerName: 'Price', field: 'price', width: 100 },
    { headerName: 'Quantity', field: 'quantity', width: 100 },
    { headerName: 'Image', field: 'image', width: 150, cellRenderer: this.imageRenderer },
    { headerName: "Actions", cellRenderer: 'deleteButtonRenderer' } 
  ];

  frameworkComponents: any = {
    deleteButtonRenderer: DeleteComponent

  };

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
          if (cartItems.length === 0) {
            return of([]); // Return an empty array if no cart items are found
          }
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
        }),
        catchError(error => {
          console.error('Error fetching cart items:', error);
          return of([]); // Return an empty array in case of error
        })
      );
  
      this.total$ = this.rowData$.pipe(
        map(items => items.reduce((total, item) => total + item.price * item.quantity, 0)),
        catchError(error => {
          console.error('Error calculating total price:', error);
          return of(0); // Return 0 in case of error
        })
      );
    } else {
      console.error('User ID not found');
      this.rowData$ = of([]); // Ensure rowData$ is set to an empty array if user ID is not found
    }
  }
  
// Method to delete a row by product ID
deleteRow(rowIndex: number): void {
  if (this.rowData$) {
    this.rowData$.subscribe(rowData => {
      const productId = rowData[rowIndex]?.id; // Use optional chaining to avoid errors if rowData[rowIndex] is undefined
      if (productId !== undefined) {
        this.onDelete(productId);
      } else {
        console.error('Product ID is undefined at rowIndex:', rowIndex);
      }
    }, error => {
      console.error('Error subscribing to rowData$:', error);
    });
  } else {
    console.error('rowData$ is undefined');
  }
}

onDelete(productId: number): void {
  const userId = this.authService.getUserId();
  if (userId !== null) {
    this.cartService.removeItemFromCart(userId, productId).subscribe(() => {
      // Refresh the cart data after deletion
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
        }),
        catchError(error => {
          console.error('Error fetching updated cart items:', error);
          return of([]); // Return an empty array in case of error
        })
      );
      this.updateTotal();
    }, error => {
      console.error('Error removing item from cart:', error);
    });
  }
}

private updateTotal(): void {
  if (this.rowData$) {
    this.total$ = this.rowData$.pipe(
      map(items => items.reduce((total, item) => total + item.price * item.quantity, 0)),
      catchError(error => {
        console.error('Error updating total price:', error);
        return of(0); // Return 0 in case of error
      })
    );
  } else {
    console.error('rowData$ is undefined');
  }
}

imageRenderer(params: { value: string }): string {
  return `<img src="${params.value}" width="100" height="100" style="object-fit: contain;">`;
}
}
