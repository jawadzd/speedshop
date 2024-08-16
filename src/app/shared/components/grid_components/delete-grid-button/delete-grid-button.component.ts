import { Component, Output, EventEmitter } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-delete-grid-button',
  templateUrl: './delete-grid-button.component.html',
  styleUrls: ['./delete-grid-button.component.scss'],
})
export class DeleteGridButtonComponent implements ICellRendererAngularComp {
  id: number | undefined;

  @Output() delete = new EventEmitter<number>();

  onDelete(): void {
    if (this.id !== undefined) {
      this.delete.emit(this.id);
    }
  }

  // Required methods for ICellRendererAngularComp
  agInit(params: any): void {
    this.id = params.data.id; // Initialize the id from the row data
  }

  refresh(params: any): boolean {
    return false; // Returning false means the component does not need to be refreshed
  }
}
