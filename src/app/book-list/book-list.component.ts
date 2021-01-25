import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IBook } from '../models/book.model';
import { IDialogData } from '../models/dialogData.model';
import { BooksService } from '../services/books.service';
import { BookUpdateModalComponent } from './book-update-modal/book-update-modal.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books$: Observable<IBook[]>;

  constructor(
    private booksService: BooksService,
    private matDialog: MatDialog,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    this.booksService.getCurrentUserBooks().then(books => {
      this.books$ = books;
    });
  }


  // Navigate to newBookForm
  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  onRemoveBook(book, event) {
    event.stopPropagation();
    this.booksService.removeBook(book);
  }

  // Navigate to Single view book
  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }

  // Get default cover
  getBookCover(book: IBook): string {
    return book.cover || this.booksService.getDefaultBookCover();
  }



  // Open update book modal
  onUpdateBook(book: IBook, event) {
    event.stopPropagation();
    const dialogData: IDialogData = {
      name: 'updateBook',
      title: `Modifier : ${book.title}`,
      description: '',
      actionButtonTxt: 'Enregistrer les modifications',
      uid: undefined,
      input: book,
    };

    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      id: 'update-book-modal',
      height: 'auto',
      width: '100%',
      maxWidth: '800px',
      data: dialogData,
    };
    this.matDialog.open(BookUpdateModalComponent, dialogConfig);
  }


}
