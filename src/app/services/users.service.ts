import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  collectionName = 'users';

  constructor(
    private readonly afs: AngularFirestore,
    public afAuth: AngularFireAuth,
  ) {
  }

  // Get all users

  // Get User by id
  getUser(uid: string){
    return this.getUsersCollection().doc(uid).get();
  }

  getCurrentUserId(): Promise<string> {
    return this.afAuth.currentUser.then((user) => user.uid);
  }



  // Create User in Firestore db
  async createUser(user: IUser, displayName?: string) {
    const userToCreate: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    const collection = this.getUsersCollection().doc(user.uid);
    const res = await collection.set(userToCreate, {
      merge: true,
    });

    return res;
  }

  // Update User
  async updateUser(user: IUser): Promise<void> {
    const userRef = this.getUsersCollection().doc(user.uid);
    return await userRef.update(user);
  }

  // Delete User
  async deleteUser(uid: string): Promise<void> {
    await this.getUsersCollection().doc(uid).delete();
  }


  // Collection Reference
  private getUsersCollection() {
    return this.afs.collection(this.collectionName);
  }
}
