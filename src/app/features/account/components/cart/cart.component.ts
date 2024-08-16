import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { ProductService } from '../../services/single-item.service';
import { Observable, forkJoin, switchMap, map, catchError, of } from 'rxjs';
import { IItem } from '../../../../shared/models/item.model';
import { ColDef } from 'ag-grid-community';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { DeleteComponent } from '../../../../shared/components/grid_components/delete/delete.component';
import { DetailsButtonRendererComponent } from '../../../../shared/components/grid_components/details-popup/details-button-renderer.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  context = { componentParent: this };

  rowData$:
    | Observable<
        {
          id: number;
          title: string;
          price: number;
          quantity: number;
          image: string;
        }[]
      >
    | undefined;
  total$: Observable<number> | undefined;
  columnDefs: ColDef[] = [];

  frameworkComponents: any = {
    deleteButtonRenderer: DeleteComponent,
    detailsButtonRenderer: DetailsButtonRendererComponent,
  };

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private productService: ProductService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.updateColumnDefs(); // Call this to set column definitions
    this.loadCartData();
    this.translate.onLangChange.subscribe(() => {
      this.updateColumnDefs(); // Update column definitions on language change
    });
  }

  private loadCartData(): void {
    const userId = this.authService.getUserId();
    if (userId !== null) {
      this.rowData$ = this.cartService.getUserCart(userId).pipe(
        switchMap((cartItems) => {
          if (cartItems.length === 0) {
            return of([]); // Return an empty array if no cart items are found
          }
          const productRequests = cartItems.map((item) =>
            this.productService.getProductDetailsById(item.productId).pipe(
              map((product: IItem) => ({
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: item.quantity,
                image: product.image,
              }))
            )
          );
          return forkJoin(productRequests);
        }),
        catchError((error) => {
          console.error('Error fetching cart items:', error);
          return of([]); // Return an empty array in case of error
        })
      );

      this.total$ = this.rowData$.pipe(
        map((items) =>
          items.reduce((total, item) => total + item.price * item.quantity, 0)
        ),
        catchError((error) => {
          console.error('Error calculating total price:', error);
          return of(0); // Return 0 in case of error
        })
      );
    } else {
      console.error('User ID not found');
      this.rowData$ = of([]); // Ensure rowData$ is set to an empty array if user ID is not found
    }
  }

  private updateColumnDefs(): void {
    this.translate
      .get(['ID', 'TITLE', 'PRICE', 'QUANTITY', 'IMAGE', 'ACTIONS'])
      .subscribe((translations) => {
        this.columnDefs = [
          { headerName: translations['ID'], field: 'id', width: 70 },
          { headerName: translations['TITLE'], field: 'title', width: 250 },
          { headerName: translations['PRICE'], field: 'price', width: 100 },
          {
            headerName: translations['QUANTITY'],
            field: 'quantity',
            width: 100,
          },
          {
            headerName: translations['IMAGE'],
            field: 'image',
            width: 150,
            cellRenderer: this.imageRenderer,
          },
          {
            headerName: translations['DELETE'],
            width: 50,
            cellRenderer: 'deleteButtonRenderer',
          },
          {
            headerName: translations['ACTIONS'],
            cellRenderer: 'detailsButtonRenderer',
          },
        ];
      });
  }

  deleteRow(rowIndex: number): void {
    this.rowData$?.subscribe(
      (rowData) => {
        const productId = rowData[rowIndex]?.id;
        if (productId !== undefined) {
          Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this item from your cart?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
          }).then((result) => {
            if (result.isConfirmed) {
              this.onDelete(productId);
            }
          });
        } else {
          console.error('Product ID is undefined at rowIndex:', rowIndex);
        }
      },
      (error) => {
        console.error('Error subscribing to rowData$:', error);
      }
    );
  }

  private onDelete(productId: number): void {
    const userId = this.authService.getUserId();
    if (userId !== null) {
      this.cartService.removeItemFromCart(userId, productId).subscribe(
        () => {
          // Refresh the cart data after deletion
          this.loadCartData(); // Call the method to reload cart data
        },
        (error) => {
          console.error('Error removing item from cart:', error);
        }
      );
    }
  }

  private imageRenderer(params: { value: string }): string {
    return `<img src="${params.value}" width="100" height="100" style="object-fit: contain;">`;
  }
}
