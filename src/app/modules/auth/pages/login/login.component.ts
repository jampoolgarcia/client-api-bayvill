// core modules
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Login{
    userName: string;
    password: string;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent {

    public hidden: boolean = true;
    public form: FormGroup;

    constructor(private fb: FormBuilder){
        this.form = this.fb.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit({userName, password}: Login): void {
        console.log("onSubmit");
    }

}