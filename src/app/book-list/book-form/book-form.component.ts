import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly booksService: BooksService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      editor: [''],
    });
  }

  onSubmit() {
    this.booksService.createNewBook({
      title: this.bookForm.value.title,
      author: this.bookForm.value.author,
      editor: this.bookForm.value.editor,
    });
    this.router.navigate(['/books']);
  }

}
