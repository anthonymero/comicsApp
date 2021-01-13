import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
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
  getBooks(): Observable<IBook[]> {
    return this.booksCollection.valueChanges();
  }

  // Get current user books
   async getCurrentUserBooks(): Promise<Observable<IBook[]>> {
    const currentUser = await this.userService.getCurrentUser();
    return this.afs.collection<IBook>('books', ref => ref.where('userId', '==', currentUser.uid)).valueChanges();

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
  async removeBook(bookToRemove: IBook): Promise<void> {
    // Delete coverRef image if exists
    if (bookToRemove.cover) {
      const storageRef = this.storageService.getStorageRef(bookToRemove.cover);
      storageRef.delete();
    }
    await this.booksCollection.doc(bookToRemove.uid).delete();
  }

  // UploadBookCover file
  async uploadBookCover(file: File): Promise<FilesUploadMetadata> {
    const mediaFolderPath = `images/${(await this.afAuth.currentUser).email}/covers/`;
    return this.storageService.uploadFileAndGetMetadata(mediaFolderPath, file);
  }

  // Update book
  async updateBook(book: IBook): Promise<void> {
    // TODO
    return this.booksCollection
    .doc (book.uid)
    .set(book, {merge: true});
  }


}


