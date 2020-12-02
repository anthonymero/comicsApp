import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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


  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.currentUser$ = this.authService.user$;
  }

  async onDeleteProfile(): Promise<void> {
    // Open warning modal with confirm button
    // DELETE PROFIL in firestore with current user id
    const uid = await this.userService.getCurrentUserId();

    if (!!uid) {
      this.userService.deleteUser(uid);
      // TODO success message
      this.authService.signOutUser();
      this.router.navigate(['']);

    }
  }

}
