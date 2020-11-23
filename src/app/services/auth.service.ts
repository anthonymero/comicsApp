import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: IUser;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngzone: NgZone,
  ) {

    // Saving user data in localstorage when logged in  and setting up null when logged out
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user as IUser;
        localStorage.setItem('user', JSON.stringify(this.userData));
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
  async signUpUser(email: string, password: string): Promise<void> {
    // create user
    const createdUser = await this.createNewUser(email, password);
    // if ok send verification mail
    if (!!createdUser) {
      this.setUserData(createdUser.user);
      this.sendVerificationMail();
    }
  }

  // Signin user with email password
  async signInUser(email: string, password: string): Promise<void> {
    await this.afAuth.signInWithEmailAndPassword(email, password);
    await this.getCurrentUser();
  }

  // Send email verification to new user
  async sendVerificationMail(): Promise<void> {
    // TODO use this method
    // await this.afAuth.sendSignInLinkToEmail(user.email, actionCodeSettings);
    await firebase.auth().currentUser.sendEmailVerification();
  }

  // Signout user
  signOutUser() {
    this.afAuth.signOut();
  }


  async getCurrentUser(): Promise<firebase.User> {
    return await this.afAuth.currentUser;
  }

  get isLoggedIn(): boolean {
    const user: IUser = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false;
  }

  private setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.id}`);

    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });

  }

}
