import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef } from 'ag-grid-community';
import { ChipComponent } from './chip/chip.component';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  rowData: any[] = []; // Initialize as an empty array

  colDefs: ColDef[] = [
    { field: "name", sortable: true, filter: true  },
    { field: "description", sortable: true, filter: true  },
    { field: "price" , sortable: true, filter: true },
    { field: "category" , sortable: true, filter: true },
    { field: "isAvailable" , sortable: true, filter: true,cellRenderer:'chipRenderer' }
  ];

  frameworkComponents: any = {
    chipRenderer: ChipComponent
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
}
