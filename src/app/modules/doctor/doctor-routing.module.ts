import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsDoctorComponent } from './pages/details-doctor/details-doctor.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { FormDoctorComponent } from './pages/form-doctor/form-doctor.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorComponent,
  },
  {
    path: 'form/:id',
    component: FormDoctorComponent,
  },
  {
    path: 'details/:id',
    component: DetailsDoctorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
