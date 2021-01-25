import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBook } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  selectedBook$: Observable<IBook>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly booksService: BooksService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.getSelectedBook(id);
  }


  async getSelectedBook(id: string) {
    this.selectedBook$ = (await this.booksService.getCurrentUserBooks())
    .pipe(map(books => books.find(b => b.uid === id)));
  }

  getBackgroundImage(book: IBook) {
    const bookCoverUrl = book.cover || this.booksService.getDefaultBookCover();
    return `url(${bookCoverUrl})`;
  }

  onBack() {
    this.router.navigate(['/books']);
  }

}
