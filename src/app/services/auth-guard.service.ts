import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(
    private readonly router: Router,
    private readonly afAuth: AngularFireAuth,
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
          this.afAuth.onAuthStateChanged(
          (user) => {
            if (user && !!user.emailVerified) {
              resolve(true);
              // if emailVerified false -> redirect page email verify
            }
            else if (user && !user.emailVerified) {
              this.router.navigate(['/auth', 'email-verify']);
              resolve(false);
            }
             else {
             this.router.navigate(['/auth', 'signin']);
             resolve(false);
            }
          }
        );
      },
    );
  }
}
