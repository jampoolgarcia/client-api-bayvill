import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validEqualsPasswords } from 'src/app/validators/app.validator';
import { UserI } from '../../model/user';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styles: ['']
})
export class ProfileComponent {

    public user: UserI;
    public form: FormGroup;

    constructor(
            private fb: FormBuilder,
            private _service: AuthService,
            private _snackBar: MatSnackBar,
        ){
        this.user = JSON.parse(localStorage.getItem('currentUser')!);
        
        this.form = this.fb.group({
            oldPassword: ['', [Validators.required, Validators.maxLength(16)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
            repeatPassword: ['', Validators.required]
        },
        {
            validator: [validEqualsPasswords]
        })
    }

    onSubmit(){
        const { oldPassword, password } = this.form.controls;
        
        this._service.changePassword(this.user.id!, oldPassword.value, password.value)
            .subscribe(data =>{
                this._snackBar.open('Su clave se a cambiado exitosamente.', 'cerrar');
                this.form.reset();
            }, (err: HttpErrorResponse) => {
                console.log(err);
                let message: string = err.error.error.message;
                this._snackBar.open(message, 'cerrar');
            })
    }

    showError(control: AbstractControl): string {
        if(control.hasError('required')){
            return 'El campo es requerido.';
        }else if(control.hasError('minlength')){
            let min = control.errors!.minlength.requiredLength;
            return `Mínimo ${min} caracteres.`;
        }else if(control.hasError('maxlength')){
            let max = control.errors!.maxlength.requiredLength;
            return `Máximo ${max} caracteres.`;
        }else if(control.hasError('notEqual')){
            return 'La clave no coincide.';
        }

        return '';
    }


    get fullName(){
        return `${this.user.firstName} ${this.user.lastName}`;
    }

    get rol(){
        if(this.user.role === 2) return 'ADMIN';
        if(this.user.role === 1) return 'USER'
        return '';
    }

    get status(){
        return this.user.isActive ? 'Activo' : 'Inactivo';
    }
}