// core modules
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { validNotEquealQuestions, validEqualsPasswords } from 'src/app/validators/app.validator';
import { UserResetI } from '../../model/user-rest';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styles: []
})
export class ResetPasswordComponent {

    public userName: FormControl;
    public isChecked: boolean = false;
    public formSecurity: FormGroup;
    public formReset: FormGroup;
    public editable: boolean = false;
    public questions: string[] = [
        '¿Cuál es tu mascota favorita?',
        '¿Nombre de tu mejor amigo?',
        '¿Equipo de futbol favorito?',
        '¿Tipo de música que más te gusta?',
        '¿Nombre de tu madre o padre?'
    ]

    constructor(
        private _service: AuthService, 
        private fb: FormBuilder,
        private _snackBar: MatSnackBar,
        private router: Router,
        ){
        
        this.userName = new FormControl(
            '', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]
        )

        this.formSecurity = this.buildingFormSecurity();
        this.formReset = this.buildingFormReset();
    }

    buildingFormSecurity(){ 
        
        return this.fb.group({
            question1: [{value: null, disabled: true}, Validators.required],
            reply1: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
            question2: [{value: null, disabled: true}, Validators.required],
            reply2: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
        },{
            validator: [validNotEquealQuestions]
        })
    }

    buildingFormReset(){
        return this.fb.group({
            password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
            repeatPassword: [null, Validators.required],
        }, {
            validator: [validEqualsPasswords]
        })
    }

    findUserName(stepper: MatStepper): void{
        
        this.isChecked = true;

        this._service.getRecordByUserName(this.userName.value)
            .subscribe((questions: number[]) =>{
                this.isChecked = false;
                this.question1.setValue(questions[0]);
                this.question2.setValue(questions[1]);
                stepper.next();
            }, (err: HttpErrorResponse) =>{
                console.log(err);
                this.userName.setErrors({
                    notUserName: true
                })
                this.isChecked = false;
            })
    }

    validResetPassword(stepper: MatStepper): void {

        let user: UserResetI = {
            userName: this.userName.value,
            password: this.password.value,
            questions: [parseInt(this.question1.value), parseInt(this.question2.value)],
            replies: [this.reply1.value, this.reply2.value]
        }

        this._service.resetPassword(user)
            .subscribe( 
            (data: boolean) =>{
                this._snackBar.open(
                    'Su contraseña ha sido cambiada exitosamente', 
                    'cerrar'
                );
                this.router.navigate(['/auth']);
            }, (err: HttpErrorResponse) => {
                let message: string = err.error.error.message; 
                this._snackBar.open(message, 'cerrar');
                stepper.reset();
            })
    }

    getInvalid(): boolean{
        if(this.userName.invalid){
            return true;
        }else if(this.isChecked){
            return true;
        }else{
            return false;
        }
    }

    showError(control: AbstractControl): string{
        
        if(control.hasError('required')){
            return 'El campo es requerido.'
        }else if(control.hasError('notUserName')){
            return 'No es un usuario valido.'
        }else if(control.hasError('notEqual')){
            return 'La clave no coincide.';
        }else if(control.hasError('minlength')){
            let min = control.errors!.minlength.requiredLength;
            return `Mínimo ${min} caracteres.`;
        }else if(control.hasError('maxlength')){
            let max = control.errors!.maxlength.requiredLength;
            return `Máximo ${max} caracteres.`;
        }

        return '';
    }

    get question1(){
        return this.formSecurity.controls.question1;
    }

    get reply1(){
        return this.formSecurity.controls.reply1;
    }

    get question2(){
        return this.formSecurity.controls.question2;
    }

    get reply2(){
        return this.formSecurity.controls.reply2;
    }

    get password(){
        return this.formReset.controls.password;
    }

    get repeatPassword(){
        return this.formReset.controls.repeatPassword;
    }
}