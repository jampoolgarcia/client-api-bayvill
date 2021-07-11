import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: ['']
})
export class TableComponent implements AfterViewInit {
  
  @Input() title: string ="Tabla"
  @Input() subtitle: string = "Listado de elementos."
  @Input() icon: string = "fas fa-users";
  @Input() displayedColumns: string[] = [];
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
  ){
  }

  ngAfterViewInit(){
    this.fillRecords();
  }

  applyFilter(event: Event){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if(this.dataSource.paginator){
          this.dataSource.paginator.firstPage();
      }
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
}
