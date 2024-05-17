import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@services/auth.service';
import { RequestStatus } from "@models/request-status.model";



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit{

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
  });

  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: RequestStatus  = 'init';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {

    this.activatedRoute.queryParamMap.subscribe(params =>{
      const email = params.get('email')
      if(email){
        this.form.controls.email.setValue(email);
      }
    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();
      this.authService.login(email, password)
      .subscribe({
        next:()=>{
          this.status ='success'
          this.router.navigate(['/app'])
        },
        error:()=>{
          this.status ='failed'
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

}
