import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsPopupComponent } from '../details-popup/details-popup.component';

@Component({
  selector: 'app-details-button-renderer',
  template: `<button (click)="showDetails()">{{ 'SHOW_DETAILS' | translate }}</button>`,
  styleUrls: ['./details-button-renderer.component.scss'],
})
export class DetailsButtonRendererComponent {
  params: any;

  constructor(private dialog: MatDialog) {}

  agInit(params: any): void {
    this.params = params;
  }

  showDetails(): void {
    this.dialog.open(DetailsPopupComponent, {
      data: this.params.data,
    });
  }
}
