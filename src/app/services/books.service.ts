import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import firebase from 'firebase';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IBook } from '../models/book.model';
import { FilesUploadMetadata, StorageService } from './storage.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  booksCollection: AngularFirestoreCollection<IBook>;

  books$: Observable<IBook[]>;
  booksSubject = new Subject<IBook[]>();
  bookCoverUrl;

  private percent = new BehaviorSubject<number>(0);
  uploadProgressPercent = this.percent.asObservable();

  uploadProgress: number;

  constructor(
    private readonly afs: AngularFirestore,
    private readonly storageService: StorageService,
    private readonly userService: UsersService,
    public afAuth: AngularFireAuth,
  ) {
    this.booksCollection = afs.collection<IBook>('books');


  }

  // Get books
  getBooks() {
    return this.booksCollection.valueChanges();
  }

  // Get current user books
  async getCurrentUserBooks(): Promise<Observable<IBook[]>> {
    const currentUser = await this.afAuth.currentUser;
    return this.afs.collection<IBook>('books', ref => ref.where('userId', '==', currentUser.uid)).valueChanges();

  }

  // Get book by id
  getSingleBook(id: number) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/books/' + id)
        .once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
    });
  }

  // Create newBook
  async createNewBook(book: IBook): Promise<void> {
    const currentUserId: string = await this.userService.getCurrentUserId();
    const uid = this.afs.createId();
    const bookToCreate: IBook = {
      uid,
      userId: currentUserId,
      title: book.title,
      volume: book.volume || undefined,
      year: book.year,
      scenario: book.scenario,
      drawing: book.drawing,
      colors: book.colors,
      cover: book.cover || ''
    };
    const collection = this.booksCollection.doc(uid);
    const res = await collection.set(bookToCreate, {
      merge: true,
    });
    return res;
  }

  // Remove Book
  removeBook(bookToRemove: IBook): void {
    if (bookToRemove.cover) {
      const storageRef = firebase.storage().refFromURL(bookToRemove.cover);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimée !');
        }
      ).catch(
        (error) => {
          console.log('fichier non trouvé' + error);
        }
      );
    }
    const bookToRemoveIndex: number = this.books$.findIndex(
      (book) => {
        if (book === bookToRemove) {
          return true;
        }
      }
    );
    this.books$.splice(bookToRemoveIndex, 1);
    this.saveBooks();
    this.emitBooks();
  }

  // UploadBookCover file
  async uploadBookCover(file: File): Promise<FilesUploadMetadata> {
    const mediaFolderPath = `images/${(await this.afAuth.currentUser).email}/covers/`;
    return this.storageService.uploadFileAndGetMetadata(mediaFolderPath, file);
  }

  // Update book
  async updateBook(book: Partial<IBook>): Promise<void> {
    // TODO
  }


}


