import { AfterViewChecked, Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    this.userData = this.authService.userData;
  }

  onResendVerificationEmail() {
    this.authService.sendVerificationMail();
  }

}
