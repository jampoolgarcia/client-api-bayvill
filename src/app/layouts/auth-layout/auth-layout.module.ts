// core module
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

// Routing module
import { AuthLayoutRoutingModule } from './auth-layout.routing';
import { IndexComponent } from './index/index.component';

@NgModule({
    declarations: [ IndexComponent ],
    imports: [
        // Routing
        AuthLayoutRoutingModule,

        // shared
        SharedModule,
    ]
})
export class AuthLayoutModule {

}