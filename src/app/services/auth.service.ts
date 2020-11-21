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

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngzone: NgZone,
  ) {

    // Saving user data in localstorage when logged in  and setting up null when logged out
    this.afAuth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }


  // Create new user
  async createNewUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Signup
  async signUpUser(email: string, password: string) {
    // create user
    const user = await this.createNewUser(email, password);
    // if ok send verification mail
    if (!!user) {
      this.sendVerificationMail(user);
    }
  }

  // Signin user with email password
  async signInUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Send email verification to new user
  async sendVerificationMail(user): Promise<void> {
    await firebase.auth().currentUser.sendEmailVerification();
  }

  // Signout user
  signOutUser() {
    this.afAuth.signOut();
  }


  getCurrentUser(): Observable<firebase.User> {
    return this.afAuth.user;
  }

}
