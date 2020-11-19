import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: firebase.User;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngzone: NgZone,
  ) {

    // Saving user data in localstorage when logged in  and setting up null when logged out
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
      }
    });
   }


  // // Create new user
   async createNewUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
      return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }


  // Signin user with email password
  async signInUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Signout user
  signOutUser() {
    this.afAuth.signOut();
  }


  getCurrentUser(): Observable<firebase.User> {
    return this.afAuth.user;
  }

}
