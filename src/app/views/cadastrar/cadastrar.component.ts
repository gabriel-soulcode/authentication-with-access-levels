import { User } from './../../models/user';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent {

  formUser: FormGroup;

  constructor(private authService: AuthService, fb: FormBuilder) {
    this.formUser = fb.group({
      email: [''],
      password: [''],
      displayName: [''],
      photoURL: [''],
      accessLevel: ['']
    });
  }

  public submit(): void {
    const user: User = this.formUser.value;
    this.authService.cadastrarUser(user).subscribe(() => {
      alert('Cadastrado')
    });
  }
}
