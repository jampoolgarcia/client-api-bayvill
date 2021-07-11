import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styles: [
  ]
})
export class PersonTableComponent implements AfterViewInit {

  @Input() displayedColumns: string[] = [];
  @Input() search: string = '';
  @Input() headerColumns: string[] = [];
  @Input() isLoadding: boolean = true;
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() _service!: any;
  @Input() isDetails: boolean = true;
  @Input() isEdit: boolean = true; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  ngAfterViewInit(){
    this.fillRecords();
  }

  fillRecords(){

    this.isLoadding= true;

    this._service.getAllRecords()
        .subscribe((data: any) =>{
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.isLoadding = false;
        }, (err: HttpErrorResponse) =>{
            console.log(err);
            let message: string = err.error.error.message; 
            this._snackBar.open(message, 'Cerrar');
        })
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
        this.dataSource.paginator.firstPage();
    }
  }

}
