import { Component, Input } from '@angular/core';
//thisi is the basic card component that will be used to display the items in the product listing page
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() item: any;
}
