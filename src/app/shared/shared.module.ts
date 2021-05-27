// core module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// material module
import { MaterialModule } from '../material/material.module';

// flex-layout
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [

    ],
    imports: [
        // core modules
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,

        // material and flexLayout
        MaterialModule,
        FlexLayoutModule,
        
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
        CommonModule,
    ],
    providers: [

    ]
})
export class SharedModule {

}