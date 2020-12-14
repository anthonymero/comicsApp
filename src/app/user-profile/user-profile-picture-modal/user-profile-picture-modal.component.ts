import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from '../../models/dialogData.model';
import { ModalActionsService } from 'src/app/services/modal-actions.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-profile-picture-modal',
  templateUrl: './user-profile-picture-modal.component.html',
  styleUrls: ['./user-profile-picture-modal.component.scss']
})
export class UserProfilePictureModalComponent implements OnInit {

  fileToUpload: File;

  constructor(
    public dialogRef: MatDialogRef<UserProfilePictureModalComponent>,
    private readonly modalActionsService: ModalActionsService,
    private readonly userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public dialogData: IDialogData,
  ) { }

  ngOnInit(): void {
  }

  onAddPicture() {
    this.userService.updateProfilePicture(this.fileToUpload);

  }

  detectFiles(event) {
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload);
    // this.onAddPicture(event.target.files[0]);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
