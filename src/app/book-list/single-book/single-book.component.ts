import { Component, OnInit } from '@angular/core';
import { IBook } from 'src/app/models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  book: IBook;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly booksService: BooksService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    this.book = {
      editor: '',
      collection: '',
      volume: '',
      title: '',
      year: '',
      scenario: '',
      drawing: '',
      colors: '',
      photo: ''
    };
    const id = this.route.snapshot.params.id;
    this.booksService.getSingleBook(+id).then(
      (book: IBook) => {
        this.book = book;
      }
    );
  }

  getBackgroundImage(book: IBook) {
    return `url(${book.photo})`;
  }

  onBack() {
    this.router.navigate(['/books']);
  }

}
