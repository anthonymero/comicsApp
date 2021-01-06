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
  }

  initForm(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      volume: [ '', Validators.required],
      year: [''],
      scenario: [''],
      drawing: [''],
      colors: [''],
    });
  }

  onSubmit() {
    this.booksService.createNewBook({
      uid: undefined,
      userId: undefined,
      title: this.bookForm.value.title,
      volume: this.bookForm.value.volume,
      year: this.bookForm.value.year,
      scenario: this.bookForm.value.scenario,
      drawing: this.bookForm.value.drawing,
      colors: this.bookForm.value.colors,
      cover: this.fileUrl,
    });
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

}
