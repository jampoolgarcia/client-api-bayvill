// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// routing
import { DoctorRoutingModule } from './doctor-routing.module';

// shared
import { SharedModule } from 'src/app/shared/shared.module';

// components
import { DoctorComponent } from './pages/doctor/doctor.component';
import { FormDoctorComponent } from './pages/form-doctor/form-doctor.component';
import { DetailsDoctorComponent } from './pages/details-doctor/details-doctor.component';



@NgModule({
  declarations: [
    DoctorComponent,
    FormDoctorComponent,
    DetailsDoctorComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule,
  ]
})
export class DoctorModule { }
