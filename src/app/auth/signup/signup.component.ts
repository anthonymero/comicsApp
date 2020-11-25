import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.fb.group({
      displayName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const data = {
      displayName: this.signUpForm.get('displayName').value,
      email: this.signUpForm.get('email').value,
      password: this.signUpForm.get('password').value,
    };
    // this.authService.createNewUser(email, password).then(
    this.authService.signUpUser(data).then(

      () => {
        // this.router.navigate(['/books']);
        this.router.navigate(['auth', 'email-verify']);

      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
