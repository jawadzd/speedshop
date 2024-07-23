import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'] // Corrected 'styleUrl' to 'styleUrls'
})
export class DataComponent implements OnInit {

  rowData: any[] = []; // Initialize as an empty array

  colDefs: ColDef[] = [
    { field: "name" },
    { field: "description" },
    { field: "price" },
    { field: "category" },
    { field: "isAvailable" }
  ];

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
