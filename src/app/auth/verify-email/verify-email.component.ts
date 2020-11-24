import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit, AfterViewChecked {

  userData;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    this.userData = this.authService.userData;
  }

  onResendVerificationEmail(): void {
    this.authService.sendVerificationMail();
  }

  onBackToSigin(): void {
    this.authService.signOutUser();
    this.router.navigate(['/auth', 'signin']);
  }

}
