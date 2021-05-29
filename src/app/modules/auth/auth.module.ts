// core modules
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

// routing module
import { AuthRoutingModule } from './auth.routing';

// components
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ResetPasswordComponent,
    ],
    imports: [
        // Routing 
        AuthRoutingModule,
        SharedModule,
    ]
})
export class AuthModule{

}