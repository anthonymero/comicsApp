import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  user$: Observable<IUser>;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.user$ = this.authService.user$;
  }


  onResendVerificationEmail(): void {
    this.authService.sendVerificationMail();
  }

  onBackToSigin(): void {
    this.authService.signOutUser();
    this.router.navigate(['/auth', 'signin']);
  }

}
