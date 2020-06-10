import { Component, OnInit, OnDestroy } from '@angular/core';
import { IBook } from '../models/book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: IBook[];
  booksSubscription: Subscription;

  constructor(
    private booksService: BooksService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: IBook[]) => {
        this.books = books;
      }
    );
    this.booksService.getBooks();
    this.booksService.emitBooks();
  }


  // Navigate to newBookForm
  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  onRemoveBook(book) {
    this.booksService.removeBook(book);
   }

  // Navigate to Single view book
  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }

}
