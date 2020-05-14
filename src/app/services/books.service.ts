import { Injectable } from '@angular/core';
import { IBook } from '../models/book.model';
import { Subject, BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: IBook[] = [];
  booksSubject = new Subject<IBook[]>();

  private percent = new BehaviorSubject<number>(0);
  uploadProgressPercent = this.percent.asObservable();

  constructor() { }

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  // Save books
  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  // Get books
  getBooks() {
    firebase.database().ref('/books')
      .on('value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      });
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
  createNewBook(newBook: IBook) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  // Remove Book
  removeBook(bookToRemove: IBook): void {
    if (bookToRemove.photo) {
      const storageRef = firebase.storage().refFromURL(bookToRemove.photo);
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
    const bookToRemoveIndex: number = this.books.findIndex(
      (book) => {
        if (book === bookToRemove) {
          return true;
        }
      }
    );
    this.books.splice(bookToRemoveIndex, 1);
    this.saveBooks();
    this.emitBooks();
  }

  // Upload file
  uploadFile(file: File) {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase.storage().ref()
        .child('images/' + almostUniqueFileName + file.name)
        .put(file);

      upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          const progress = (upload.snapshot.bytesTransferred / upload.snapshot.totalBytes) * 100;
          this.percent.next(progress);
          console.log('chargement...', progress);
        },
        (error) => {
          console.log('Erreur de chargement' + error);
          reject(error);
        },
        () => {
          resolve(upload.snapshot.ref.getDownloadURL());
        }
      );
    });
  }
  // Update book
}


