import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-plus-button',
  standalone: true,
  templateUrl: './plus-button.component.html',
  styleUrls: ['./plus-button.component.scss'],
  imports: [CommonModule],
})
export class PlusButtonComponent {
  @Input() itemPrice = 0;
  @Input() isAuthenticated = false; // New input for authentication status
  @Output() itemCountChange = new EventEmitter<number>();
  count = 1;
  expanded = false;
  totalPrice = 0;

  toggle() {
    console.log("toggle");
    if (this.isAuthenticated) { // Check authentication status before toggling
      console.log("is authenticated");
      this.expanded = !this.expanded;
      this.count = 1;
      this.totalPrice = this.itemPrice;
      this.itemCountChange.emit(this.count);
    } else {
      console.log("is not auth");
      this.itemCountChange.emit(0); // Notify parent if unauthenticated
    }
  }

  increment() {
    if (this.isAuthenticated) { // Check authentication status before incrementing
      this.count++;
      this.updateTotalPrice();
      this.itemCountChange.emit(this.count);
    } else {
      this.itemCountChange.emit(0); // Notify parent if unauthenticated
    }
  }

  decrement() {
    if (this.isAuthenticated && this.count > 0) { // Check authentication status before decrementing
      this.count--;
      this.updateTotalPrice();
      this.itemCountChange.emit(this.count);
    }
    if (this.count === 0) {
      this.expanded = false;
    }
  }

  updateTotalPrice() {
    this.totalPrice = this.count * this.itemPrice;
  }
}
