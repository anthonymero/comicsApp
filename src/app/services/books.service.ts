import { Injectable } from '@angular/core';
import { IBook } from '../models/book.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: IBook[] = [];
  booksSubject = new Subject<IBook[]>();
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
  getSingleBook(id: string) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/books/view/' + id)
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
  createNewBook(newBook: IBook): void {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  // Remove Book
  removeBook(bookToRemove: IBook): void {
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
  // Update book
  // Delete book
}


