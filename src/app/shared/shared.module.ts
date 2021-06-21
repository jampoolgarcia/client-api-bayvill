// core module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// material module
import { MaterialModule } from '../material/material.module';

// flex-layout
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//  compoenents
import { NavComponent } from './components/nav/nav.component';
import { TableComponent } from './components/table/table.component';
import { ActionBarComponent } from './components/action-bar/action-bar.component';

@NgModule({
    declarations: [
        NavComponent,
        TableComponent,
        ActionBarComponent,
    ],
    imports: [
        // core modules
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterModule,

        // material and flexLayout
        MaterialModule,
        FlexLayoutModule,
        
    ],
    exports: [
        // core
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
        CommonModule,

        // components
        NavComponent,
        TableComponent,
        ActionBarComponent,   
    ],
    providers: [

    ]
})
export class SharedModule {

}