import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IUser } from '../models/user.model';
import { UsersService } from './users.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<IUser>;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngzone: NgZone,
    private readonly userService: UsersService,
  ) {

    // Get the auth state, then fetch the FireStore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (!!user) {
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

  }

  // Signup
  async signUpUser(data): Promise<void> {
    // create user authentication (firebase)
    const userAuthentication = await this.createUserAuthentication(data.email, data.password);
    // if user authentication created successfull
    if (!!userAuthentication) {
      // create user in firestore db
      await this.userService.createUser(userAuthentication.user, data.displayName);
      // this.sendVerificationMail();
    }
  }

  // Signin user with email password
  async signInUser(email: string, password: string): Promise<void> {
    await this.afAuth.signInWithEmailAndPassword(email, password);
    // await this.getCurrentUser();
  }

  // Send email verification to new user
  async sendVerificationMail(): Promise<void> {
    // TODO use this method
    // await this.afAuth.sendSignInLinkToEmail(user.email, actionCodeSettings);
    await firebase.auth().currentUser.sendEmailVerification();
  }

  // SignIn with Google
  async signinWithGoogle(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return await this.authLogin(provider);
  }

  // Signin with Facebook
  async signinWithFB() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return await this.authLogin(provider);
  }

  // Auth logic to run auth providers
  async authLogin(provider: firebase.auth.AuthProvider): Promise<void> {
    const result = await this.afAuth.signInWithPopup(provider);
    if (!!result) {
      await this.userService.createUser(result.user);
    }
  }

  // Signout user
  signOutUser() {
    this.afAuth.signOut();
  }




  ////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////


  // Create new authenticated user
  private async createUserAuthentication(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }
}
