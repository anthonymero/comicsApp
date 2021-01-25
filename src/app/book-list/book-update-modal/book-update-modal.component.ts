import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from 'src/app/models/dialogData.model';
import { BookFormComponent } from './../book-form/book-form.component';

@Component({
  selector: 'app-book-update-modal',
  templateUrl: './book-update-modal.component.html',
  styleUrls: ['./book-update-modal.component.scss']
})
export class BookUpdateModalComponent implements OnInit {
  @ViewChild(BookFormComponent, { static: false }) bookFormRef: BookFormComponent;

  constructor(
    public dialogRef: MatDialogRef<BookUpdateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IDialogData,

  ) { }

  ngOnInit(): void {
  }


  onSaveModifications() {
    this.bookFormRef.onSubmit();
  }

}
