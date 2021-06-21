// core modules
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

// routing module
import { AuthRoutingModule } from './auth.routing';

// components
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ResetPasswordComponent,
        ListUserComponent,
        ProfileComponent,
    ],
    imports: [
        // Routing 
        AuthRoutingModule,
        SharedModule,
    ],
    exports: [
        ListUserComponent,
        ProfileComponent,
    ]
})
export class AuthModule{

}