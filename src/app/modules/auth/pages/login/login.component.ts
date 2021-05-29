// core modules
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    public isChecked: boolean = false;

    constructor(
        private fb: FormBuilder,
        private _service: AuthService,
        private _snackBar: MatSnackBar,
        private router: Router,
        ){
        this.form = this.fb.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit({userName, password}: Login): void {
        
        this.isChecked = true;
        
        this._service.login(userName, password)
            .subscribe(
            data =>{
                this.isChecked = false;
                this._service.saveSession(data);
                this._snackBar.open('Bienvenido...', 'Cerrar');
                this.form.reset();
                this.router.navigate(['/']);
            }, err =>{
                this.isChecked = false;
                console.log(err);
                let message: string = err.error.error.message; 
                this._snackBar.open(message, 'Cerrar');
            })
    }

    getInvalid(): boolean{

        if(this.form.invalid){
            return true;
        }else if(this.isChecked){
            return true;
        }

        return false;
    }

}