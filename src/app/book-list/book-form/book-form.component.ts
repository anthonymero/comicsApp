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
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  progressPercent: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly booksService: BooksService,
  ) { }

  ngOnInit() {
    this.initForm();
    this.booksService.uploadProgressPercent.subscribe(progressPercent => this.progressPercent = progressPercent);
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
      photo: this.fileUrl ? this.fileUrl : '',

    });
    this.router.navigate(['/books']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.booksService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

}
