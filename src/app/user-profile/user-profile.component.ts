import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUser$: Observable<IUser>;


  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly router: Router,
    private matDialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.currentUser$ = this.authService.user$;
  }

  async onDeleteProfile(): Promise<void> {
    // Open warning modal with confirm button
    this.openModal();
    // DELETE PROFIL in firestore with current user id
    const uid = await this.userService.getCurrentUserId();

    if (!!uid) {
      // this.userService.deleteUser(uid);
      // TODO success message

      // this.authService.signOutUser();
      // this.router.navigate(['']);

    }
  }

  openModal(): void {
    const dialogConfig: MatDialogConfig = {
      disableClose: true,
      id: 'confirm-modal',
      height: '350px',
      width: '450px',
      data: {
        name: 'delete my account',
        title: 'Etes-vous certain de vouloir supprimer votre compte?',
        description: 'Cette action suprimera définitivement votre compte utilisateur, toutes vos données liées à ce compte seront également supprimées.',
        actionButtonTxt: 'Confirmer',
      },
    };
    this.matDialog.open(ConfirmModalComponent, dialogConfig);
  }

}
