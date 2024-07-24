import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef } from 'ag-grid-community';
// import { ChipComponent } from './components/chip/chip.component';
// import { EditorComponent } from './components/editor/editor.component';
// import { DeleteComponent } from './components/delete/delete.component';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  // styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  rowData: any[] = []; 

  colDefs: ColDef[] = [
    { field: "name", sortable: true, filter: true  },
    { field: "description", sortable: true, filter: true ,editable: true, cellEditor: 'descriptionEditor' },
    { field: "price" , sortable: true, filter: true , valueFormatter: this.currencyFormatter },
    { field: "category" , sortable: true, filter: true },
    { field: "isAvailable" , sortable: true, filter: true,cellRenderer:'chipRenderer' },
    { headerName: "Actions", cellRenderer: 'deleteButtonRenderer' } 
  ];

  frameworkComponents: any = {
    // chipRenderer: ChipComponent,
    // descriptionEditor:EditorComponent,
    // deleteButtonRenderer: DeleteComponent

  };
  

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.http.get<any[]>('assets/data.json').subscribe(data => {
      this.rowData = data;
    });
  }
  currencyFormatter(params: any): string {
    const value = params.value;
    return `$${value.toFixed(2)}`;
  }

  deleteRow(index: number): void {
    this.rowData.splice(index, 1); 
   
  }
}
