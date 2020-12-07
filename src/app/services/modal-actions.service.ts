import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalActionsService {

  constructor() { }

  modalAction(modalData: any) {
    switch (modalData.name) {
      case 'deleteMyAccount':
        this.deleteMyAccount();
        break;

        case 'removeBook':
          this.removeBook();
          break;

      default:
        break;
    }
  }


  private deleteMyAccount(): void {
    // Delete user account
    console.log('delete my account !');
  }

  private removeBook(): void {
    // Remove book
    console.log(' Remove book !!!!');
  }
}
