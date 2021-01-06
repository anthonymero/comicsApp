import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IBook } from '../models/book.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Observable<IBook[]>;
  currentUser;

  constructor(
    private booksService: BooksService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    this.booksService.getCurrentUserBooks().then(books => this.books = books);
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


}
