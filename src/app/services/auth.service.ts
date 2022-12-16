import { Credencials } from './../models/credencials';
import { User } from './../models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, from, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private functions: AngularFireFunctions,
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  public cadastrarUser(user: User): Observable<any> {
    const createUser = this.functions.httpsCallable('createUser');
    return createUser(user).pipe(
      catchError(error => {
        console.log(error)
        alert("ERRO");
        return EMPTY;
      })
    );
  }

  public signIn(user: Credencials): Observable<any> {
    const promise = this.auth.signInWithEmailAndPassword(user.email, user.password);
    return from(promise).pipe(
      catchError(error => {
        console.log(error)
        alert("ERRO");
        return EMPTY;
      }),
      tap(async (userCredencials) => {
        if (userCredencials.user) {
          const info = await userCredencials.user.getIdTokenResult();
          const accessLevel = info.claims['accessLevel'];
          this.redirectUser(accessLevel);
        }
      })
    );
  }

  private redirectUser(accessLevel: string): void {
    switch (accessLevel) {
      case "USER":
        this.router.navigate(['/home']);
        return;
      case "DEV":
        this.router.navigate(['/dash']);
        return;
      case "MANAGER":
        this.router.navigate(['/admin']);
        return;
      default:
        this.router.navigate(['/home']);
        return;
    }
  }
}
