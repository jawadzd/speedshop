import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

// Define the IndexedDB schema
interface MyDB extends DBSchema {
  cart: {
    key: number;
    value: {
      userId: number;
      productId: number;
      quantity: number;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private dbPromise: Promise<IDBPDatabase<MyDB>>;

  constructor() {
    // Open or create the IndexedDB database
    this.dbPromise = openDB<MyDB>('my-database', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('cart')) {
          db.createObjectStore('cart', {
            keyPath: 'productId',
          });
        }
      },
    });
  }

  // Get the user's cart from IndexedDB
  async getUserCart(userId: number): Promise<any> {
    const db = await this.dbPromise;
    const allItems = await db.getAll('cart');
    return allItems.filter((item) => item.userId === userId);
  }

  // Add an item to the user's cart in IndexedDB
  async addItemToCart(userId: number, item: { productId: number; quantity: number }): Promise<void> {
    const db = await this.dbPromise;
    const existingItem = await db.get('cart', item.productId);

    if (existingItem) {
      // If the item already exists in the cart, update the quantity
      existingItem.quantity += item.quantity;
      await db.put('cart', existingItem);
    } else {
      // If the item does not exist, add it to the cart
      await db.put('cart', { userId, productId: item.productId, quantity: item.quantity });
    }
  }
}
