import { Component, OnInit } from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/servises/authservice/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
  })
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  public isAuth = this.authService.isAuthenticatedUser();

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initLoginForm();
  }

  private initLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), LoginComponent.passwordStrengthValidator()]],
    });
  }

  public static passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;

      if (!/[A-Z]/.test(value)) {
        return { passwordUpperCase: true };
      }

      if (!/[a-z]/.test(value)) {
        return { passwordLowerCase: true };
      }

      if (!/\d/.test(value)) {
        return { passwordNumber: true };
      }

      if (!/[!@#?$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value)) {
        return { passwordSpecialChar: true };
      }

      return null;
    };
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public login(): void {
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password);
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['res']);
    }
  }
}
