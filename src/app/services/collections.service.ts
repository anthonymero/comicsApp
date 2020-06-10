import { Injectable } from '@angular/core';
import { ICollection } from '../models/collection.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  collections: ICollection[] = [];
  collectionsSubject = new Subject<ICollection[]>();

  constructor() { }

  emitCollections() {
    this.collectionsSubject.next(this.collections);
  }

  // Save collections
  saveCollections() {
    firebase.database().ref('/collections').set(this.collections);
  }

  // Get collections
  getCollections() {
    firebase.database().ref('/collections')
      .on('value', (data) => {
        this.collections = data.val() ? data.val() : [];
        this.emitCollections();
      });
  }

  // Get collection by id
  getCollectionById(id: number) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/collections' + id)
        .once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
    });
  }

  // Create new collection
  createNewCollection(newCollection: ICollection) {
    this.collections.push(newCollection);
    this.saveCollections();
    this.emitCollections();
  }

  // Remove collection
  removeCollection(collectionToRemove: ICollection): void {
    const collectionToRemoveIndex: number = this.collections.findIndex(
      (collection) => {
        if (collection === collectionToRemove) {
          return true;
        }
      }
    );
    this.collections.splice(collectionToRemoveIndex, 1);
    this.saveCollections();
    this.emitCollections();
  }
}
