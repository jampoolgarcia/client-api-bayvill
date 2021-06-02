// core modules
import { NgModule } from '@angular/core';

// Routing module
import { LayoutRoutingModule } from './layout.routing';

// shared
import { SharedModule } from 'src/app/shared/shared.module';

// compnents
import { IndexComponent } from './index/index.component';

@NgModule({
    imports: [
        //  Routing
        LayoutRoutingModule,

        // sharedModule
        SharedModule,
    ],
    declarations: [IndexComponent]
})
export class LayoutModule {

}
