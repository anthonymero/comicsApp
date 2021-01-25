import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IBook } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  @Input() book: IBook;
  @Input() mode: string;

  bookForm: FormGroup;
  bookToSubmit: IBook;
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
    this.mode = this.mode === 'update' ? this.mode : 'create';
  }

  initForm(): void {
    this.bookForm = this.fb.group({
      title: [this.book?.title || '', Validators.required],
      volume: [this.book?.volume || '', Validators.required],
      year: [this.book?.year || ''],
      scenario: [this.book?.scenario || ''],
      drawing: [this.book?.drawing || ''],
      colors: [this.book?.colors || ''],
      cover: this.book?.cover || null,
    });
  }

  onSubmit() {
    this.bookToSubmit = {
      uid: this.book?.uid || undefined,
      title: this.bookForm.value.title,
      volume: this.bookForm.value.volume,
      year: this.bookForm.value.year,
      scenario: this.bookForm.value.scenario,
      drawing: this.bookForm.value.drawing,
      colors: this.bookForm.value.colors,
      cover: this.fileUrl,
    };
    // resolve submitMethod
    this.resolveSubmitMethod(this.mode);

    this.router.navigate(['/books']);
  }

  async onUploadFile(file: File) {
    this.fileIsUploading = true;
    const fileMetadata = await this.booksService.uploadBookCover(file);
    fileMetadata.downloadUrl$.pipe()
      .subscribe(downloadUrl => this.fileUrl = downloadUrl);
    fileMetadata.uploadProgress$.pipe()
      .subscribe(progress => {
        this.progressPercent = progress;
        if (progress === 100) {
          this.fileIsUploading = false;
          this.fileUploaded = true;
        }
      });


  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

  async createNewBook() {
    await this.booksService.createNewBook(this.bookToSubmit);
  }

  async UpdateBook() {
    if (!this.fileUrl){
      this.bookToSubmit.cover = this.book?.cover;

    }
    await this.booksService.updateBook(this.bookToSubmit);
  }

  private resolveSubmitMethod(mode: string): void {
    if (mode === 'update') {
      this.UpdateBook();
    } else {
      this.createNewBook();
    }
  }

}
