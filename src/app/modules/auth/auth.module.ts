// core modules
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

// routing module
import { AuthRoutingModule } from './auth.routing';

// components
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        // Routing 
        AuthRoutingModule,
        SharedModule,
    ],
    exports: [

    ]
})
export class AuthModule{

}