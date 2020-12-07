import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    // TODO dialogData model
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
  ) {
    console.log(this.dialogData);
  }

  ngOnInit(): void {
  }

  actionFunction(): void {
    alert('I am a work in progress');
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
