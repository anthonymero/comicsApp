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
  ) { }


  // // Create new user
    createNewUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return new Promise((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password).then(
        () => resolve(),
        (error) => reject(error)
      );
    });
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
