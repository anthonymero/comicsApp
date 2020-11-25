import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    this.authService.signInUser(email, password).then(
      () => {
        this.router.navigate(['/books']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  onRegister(): void {
    this.router.navigate(['auth', 'signup']);
  }

  onSigninWithGoogle(): void {
    this.authService.signinWithGoogle()
      .then(
        () => {
          this.router.navigate(['/books']);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
  }

  onSigninWithFB(): void {
    this.authService.signinWithFB()
      .then(
        () => {
          this.router.navigate(['/books']);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
  }

}
