import { Credencials } from './../../models/credencials';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin: FormGroup;

  constructor(fb: FormBuilder, private authService: AuthService) {
    this.formLogin = fb.group({
      email: [''],
      password: ['']
    });
  }

  public entrar() {
    const credencials: Credencials = this.formLogin.value;
    this.authService.signIn(credencials).subscribe(() => {
      alert("Bem-vindo(a)");
    })
  }
}
