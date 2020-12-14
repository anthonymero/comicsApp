import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { IDialogData } from '../models/dialogData.model';
import { IUser } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUser$: Observable<IUser>;
  userProfileForm: FormGroup;
  comicsStyles: string[];


  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private fb: FormBuilder,
    private matDialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.currentUser$ = this.authService.user$;
    this.comicsStyles = ['aventure', 'biographie', 'fantastique / héroïc-fantasy', 'historique', 'humour', 'jeunesse', 'roman graphique', 'science-fiction', 'polar et thriller', 'western'];
    this.initForm();
  }

  initForm(): void {
    this.userProfileForm = this.fb.group({
      displayName: [''],
      favoriteCollection: [''],
      favoriteStyle: [''],
    });
  }

  onSubmit() {
    const formValues: Partial<IUser> = this.userProfileForm.value;
    this.userService.updateUser(formValues);
  }

  async onDeleteProfile(): Promise<void> {
    // DELETE PROFIL in firestore with current user id
    const uid = await this.userService.getCurrentUserId();
    // Open warning modal with confirm button
    this.openModal(uid);
  }



  openModal(uid): void {
    const dialogData: IDialogData = {
      name: 'deleteMyAccount',
      title: 'Etes-vous certain de vouloir supprimer votre compte?',
      description: 'Cette action suprimera définitivement votre compte utilisateur, toutes vos données liées à ce compte seront également supprimées.',
      actionButtonTxt: 'Confirmer',
      uid,
    };

    const dialogConfig: MatDialogConfig = {
      disableClose: true,
      id: 'confirm-modal',
      height: '350px',
      width: '450px',
      data: dialogData,
    };
    this.matDialog.open(ConfirmModalComponent, dialogConfig);

  }

}
