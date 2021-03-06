import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalActionsService } from 'src/app/services/modal-actions.service';
import { IDialogData } from '../../models/dialogData.model';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    private readonly modalActionsService: ModalActionsService,
    @Inject(MAT_DIALOG_DATA) public dialogData: IDialogData,
  ) {
    console.log(this.dialogData);
  }

  ngOnInit(): void {
  }

  actionFunction(): void {
    this.modalActionsService.modalAction(this.dialogData);
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
