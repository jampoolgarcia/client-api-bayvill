import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PersonTableComponent } from 'src/app/shared/components/person-table/person-table.component';
import { DoctorI } from '../../model/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: ['']
})
export class DoctorComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'ci', 'phone', 'sex', 'specialty'];
  public headerColumns: string[] = ['Nombre', 'C.I', 'Telefono', 'Genero', 'Especialidad']
  public dataSource!: MatTableDataSource<DoctorI[]>;

  @ViewChild(PersonTableComponent) table!: PersonTableComponent;

  constructor(
      public _service: DoctorService
    ) { }

  ngOnInit(): void {
  }

  public filter(filterValue: string): void {
    this.table.search = filterValue;
    this.table.applyFilter(filterValue);
  }

}
