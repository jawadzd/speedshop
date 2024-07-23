import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss'
})
export class ChipComponent  implements OnInit {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  ngOnInit(): void {}

}
