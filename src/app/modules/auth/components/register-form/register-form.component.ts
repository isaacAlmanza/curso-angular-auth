import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { CustomValidators } from '@utils/validators';
import { RequestStatus } from "@models/request-status.model";
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {

  formUser = this.formBuilder.group({
    email: ['',[Validators.required, Validators.email]]
  })

  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
  });

  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';
  showRegister = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  messageError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      this.authService.registerAndLogin(name, password, email)
      .subscribe({
        next:()=>{
          this.status = 'success'
          this.router.navigate(['/app/boards'])
        },
        error:(err)=>{
          this.status = 'failed';
          switch(err.error.code){
            case 'SQLITE_CONSTRAINT_UNIQUE':
              this.messageError = 'Usuario ya existe'
              break;
          }
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

  ValidateUser(){
    if(this.formUser.valid){
      this.statusUser = 'loading'
      const  { email } = this.formUser.getRawValue();

      this.authService.isAvailable(email)
      .subscribe({
        next:(res)=>{
          this.statusUser = 'success'
          if(res.isAvailable){
            this.showRegister =  true
            this.form.controls.email.setValue(email);
          }
          else{
            this.router.navigate(['/login'],{
              queryParams:{email}
            })
          }
          
        },
        error:()=>{
          this.statusUser = 'failed'
        }
      })
    }else{
      this.formUser.markAllAsTouched()
    }
  }
  
}
