// core
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validEqualsPasswords, validNotEquealQuestions } from 'src/app/validators/app.validator';
import { HttpErrorResponse } from '@angular/common/http';

// materials
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';

// services
import { AuthService } from '../../services/auth.service';

// models
import { UserI } from '../../model/user';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: []
})
export class RegisterComponent {

    public formUser: FormGroup;
    public formSecurity: FormGroup;
    public userName: string = '';
    public editable: boolean = true;

    constructor(
        private fb: FormBuilder,
        private _service: AuthService,
        private _snackBar: MatSnackBar
        ){
        this.formUser = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(16)]],
            lastName:  ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(16)]],
            userName:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
            password:  ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
            repeatPassword: ['', Validators.required],
        }, {
            validator: [validEqualsPasswords]
        })
        this.formSecurity = this.fb.group({
            question1: ['', Validators.required],
            reply1: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
            question2: ['', Validators.required],
            reply2: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
        },{
            validator: [validNotEquealQuestions]
        })
    }

    onSubmit(stepper: MatStepper){

        let data: UserI = this.getData();

        this._service.saveRecord(data)
            .subscribe(
                data => {
                    this.userName = `${data.firstName} ${data.lastName}`;
                    this.editable = false;
                    stepper.next();
                }, (err: HttpErrorResponse) =>{
                    console.log(err);
                    let message: string = err.error.error.message; 
                    if(message.includes('usuario')){
                        this.formUser.controls.userName.setErrors({
                            notAviable: true
                        })
                        stepper.previous();
                    }else{
                        this._snackBar.open(message, 'cerrar')
                    }
                }
            )
    }

    getData(): UserI {
        return {
            firstName: this.formUser.controls.firstName.value,
            lastName: this.formUser.controls.lastName.value,
            userName: this.formUser.controls.userName.value,
            password: this.formUser.controls.password.value,
            role: 1,
            isActive: false,
            questions: [
                parseInt(this.formSecurity.controls.question1.value), 
                parseInt(this.formSecurity.controls.question2.value)
            ],
            replies: [
                this.formSecurity.controls.reply1.value, 
                this.formSecurity.controls.reply2.value
            ]
        }
    }

    showError(control: AbstractControl): string {

        if(control.hasError('required')){
            return 'El campo es requerido.';
        }else if(control.hasError('notAviable')){
            return 'El usuario se encuentra en uso.';
        }else if(control.hasError('notEqual')){
            return 'La clave no coincide.';
        }else if(control.hasError('equal')){
            return 'Las preguntas son iguales.';
        }else if(control.hasError('minlength')){
            let min = control.errors!.minlength.requiredLength;
            return `Mínimo ${min} caracteres.`;
        }else if(control.hasError('maxlength')){
            let max = control.errors!.maxlength.requiredLength;
            return `Máximo ${max} caracteres.`;
        }else if(control.hasError('pattern')){
            return `Sólo se permiten letras.`;
        }

        return '';
    }
}