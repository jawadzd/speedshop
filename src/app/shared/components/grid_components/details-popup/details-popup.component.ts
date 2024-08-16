import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-details-popup',
  templateUrl: './details-popup.component.html',
  styleUrls: ['./details-popup.component.scss'],
})
export class DetailsPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // 'data' will hold the item details
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}