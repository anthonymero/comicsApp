import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ICollection } from '../models/collection.model';
import firebase from 'firebase';
import { FilesUploadMetadata, StorageService } from './storage.service';
import { UsersService } from './users.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  collectionsCollections: AngularFirestoreCollection<ICollection>;
  collections$: Observable<ICollection[]>;
  collectionsSubject = new Subject<ICollection[]>();

  constructor(
    private readonly afs: AngularFirestore,
    private userService: UsersService,
  ) {
    this.collectionsCollections = afs.collection<ICollection>('collections');
   }



  // Save collections
  saveCollections() {
  }

  // Get collections
  getCollections() {
  }

  // Get collection by id
  async getCurrentUserCollections(): Promise<Observable<ICollection[]>> {
    const currentUser = await this.userService.getCurrentUser();
    return this.afs.collection<ICollection>('collections', ref => ref.where('userId', '==', currentUser.uid)).valueChanges();
  }

  // Create new collection
  async createNewCollection(newCollection: ICollection) {
    const currentUser = await this.userService.getCurrentUser();
    const uid = this.afs.createId();
    const collectionToCreate: ICollection = {
      uid,
      name: newCollection.name,
      editor: newCollection.editor,
      volumeCount: newCollection.volumeCount,
      state: newCollection.state,
      style: newCollection.style,
      userId: currentUser.uid,
      books: newCollection.books,
    };

    return await this.collectionsCollections.doc(uid)
    .set(collectionToCreate, {
      merge: true,
    });

  }

  // Remove collection
  removeCollection(collectionToRemove: ICollection): void {

  }
}
