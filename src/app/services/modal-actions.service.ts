import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IDialogData } from '../models/dialogData.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ModalActionsService {

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router,

  ) { }

  modalAction(modalData: IDialogData) {
    switch (modalData.name) {
      case 'deleteMyAccount':
        this.deleteMyAccount(modalData.uid);
        break;

      case 'removeBook':
        this.removeBook();
        break;

      default:
        break;
    }
  }


  private async deleteMyAccount(uid: string): Promise<void> {
    // Delete user account in firestore with current user id
    await this.userService.deleteUser(uid)
      .then(res => {
        console.log('user removed successfully', res);
        this.router.navigate(['auth', 'signup']);

      })
      .catch(error => {
        console.log('error', error);
      });
  }


  private removeBook(): void {
    // Remove book
    console.log(' Remove book !!!!');
  }
}
