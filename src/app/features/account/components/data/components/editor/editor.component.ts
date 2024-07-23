import { Component } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements ICellEditorAngularComp {
  public params!: ICellEditorParams; 
  public value: string = '';

  agInit(params: ICellEditorParams): void {
    this.params = params;
    this.value = this.params.value;
  }

  getValue(): any {
    return this.value;
  }

  isPopup(): boolean {
    return false;
  }
}