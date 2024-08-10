import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-plus-button',
  standalone: true,
  templateUrl: './plus-button.component.html',
  styleUrls: ['./plus-button.component.scss'],
  imports:[CommonModule]
})
export class PlusButtonComponent {
  @Input() itemPrice = 0;
  @Output() itemCountChange = new EventEmitter<number>();
  count = 1;
  expanded = false;
  totalPrice = 0;

  toggle() {
    this.expanded = !this.expanded;
    this.count=1;
    this.totalPrice=this.itemPrice;
    this.itemCountChange.emit(this.count);

  }

  increment() {
    this.count++;
    this.updateTotalPrice();
    this.itemCountChange.emit(this.count);
  }

  decrement() {
    if (this.count > 0) {
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
