import { Component } from '@angular/core';
import { FormGroup, FormBuilder ,Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import {NzMessageService} from "ng-zorro-antd/message"
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  isSpinning: boolean = false;
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder,
  private authService:AuthService,
  private message:NzMessageService,
  private router: Router){ } //Declaramos el metodo authservice donde se ubica la referencia a la Api



  ngOnInit(){
    this.signupForm = this.fb.group({
      name : [null, [Validators.required]],
      email : [null, [Validators.required, Validators.email]],
      password : [null, [Validators.required]],
      checkPassword : [null, [Validators.required, this.confirmationValidate]],
    })
  }
  
  confirmationValidate =(control: FormControl):{ [s: string]: boolean} => { //Metodo para verificar la contraseña
    if (!control.value) {                                                   // Y verificar si los valores coinciden
      return {required: true};
    }else if (control.value !== this.signupForm.controls['password'].value){
      return {confirm: true, error: true};
    }
    return{};
    }
  

  register(){
    console.log(this.signupForm.value);
    this.authService.register(this.signupForm.value).subscribe((res) =>{
      console.log(res);
      if (res.id !=null){
        this.message.success("Se Registro con exito!", {nzDuration: 5000});
        this.router.navigateByUrl("/login")
      }else{
        this.message.error("Hubo un problema con su registro!",{nzDuration: 5000});
      }

    })
  }
}
