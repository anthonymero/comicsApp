import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUser } from '../models/user.model';
import { StorageService } from './storage.service';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  collectionName = 'users';

  constructor(
    private readonly afs: AngularFirestore,
    private readonly storageService: StorageService,
    public afAuth: AngularFireAuth,
  ) {

  }

  // Get all users

  // Get current user
  async getCurrentUser(): Promise<firebase.User> {
    return await this.afAuth.currentUser;
  }

  // Get User by id
  getUser(uid: string) {
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
  async updateUser(user: Partial<IUser>): Promise<void> {
    const uid = await this.getCurrentUserId();
    const userRef = this.getUsersCollection().doc(uid);
    await userRef.update(user)
      // TODO notification service
      .then(() => alert('Profile updated successfully !!'))
      .catch((err) => alert(err));
  }

  // Update profile picture
  async updateProfilePicture(file: File) {
    const mediaFolderPath = `images/${(await this.afAuth.currentUser).email}/profile/`;
    const { downloadUrl$, uploadProgress$ } = this.storageService.uploadFileAndGetMetadata(mediaFolderPath, file);
    downloadUrl$.pipe()
    .subscribe(async (downloadUrl) => {
      await this.updateUser({customPhotoURL: downloadUrl});
    });
  }

  // Delete User
  async deleteUser(uid: string): Promise<void> {
    const currentUser = await this.afAuth.currentUser;
    await this.getUsersCollection().doc(uid).delete();
    await currentUser.delete().catch((error) => {
      console.log('err', error);
    });
  }


  // Collection Reference
  private getUsersCollection() {
    return this.afs.collection(this.collectionName);
  }
}
