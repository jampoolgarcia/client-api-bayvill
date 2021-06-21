import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserI } from '../../model/user';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styles: []
})
export class ListUserComponent implements OnInit {

    public isLoadding: boolean = true;
    public dataSource!: MatTableDataSource<any>;
    public displayedColumns: string[]= ['fullName', 'userName', 'role', 'isActive'];
    public search: string = '';
    
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        public _service: AuthService,
        private _snackBar: MatSnackBar,
        public _dialog: MatDialog,
    ){
        
    }

    // openDialog(id: string): void{

    //     const dialogRef = this._dialog.open(UserDialogComponent, {
    //          data: id 
    //     })

    //     dialogRef.afterClosed().subscribe(res => {
    //         if(res) this._snackBar.open('Usuario', 'Cerrar');
    //     })
    // }

    ngOnInit(): void {
        this.fillRecords();
    }

    update(user: UserI):void{

        this.isLoadding= true;

        this._service.updateRecordStatusAndRole(user.id!, user.role!, user.isActive!)
            .subscribe(data => {
                this._snackBar.open(
                    `Usuario ${user.firstName} ${user.lastName} actualizado.`, 
                    'Cerrar'
                )
                this.fillRecords();
            })
    }

    fillRecords(){

        this.isLoadding= true;
        this._service.getAllRecords()
            .subscribe(data => {
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

    filter(filterValue: string){
        this.search = filterValue; 
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if(this.dataSource.paginator){
            this.dataSource.paginator.firstPage();
        }
    }

    add(){
        console.log('add');
    }

    download(){
        console.log('download');
    }
    
}