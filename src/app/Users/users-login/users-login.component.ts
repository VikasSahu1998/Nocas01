import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../Shared/Api/api.service';
import { AuthServiceService } from '../Shared/Api/auth-service.service';

@Component({
  selector: 'app-users-login',
  templateUrl: './users-login.component.html',
  styleUrls: ['./users-login.component.scss']
})
export class UsersLoginComponent implements OnInit {

  LogInForm: FormGroup | any;
  email: string = '';
  password: string = '';
  loginError: string = '';
  showPassword: boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private authService: AuthServiceService, // Inject the AuthService
    private apiservice: ApiService
  ) { }

  ngOnInit(): void {
    this.LogInForm = this.formbuilder.group({ // Use formbuilder.group instead of new FormGroup
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Check if user is already authenticated (automatic login)
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['UsersProfile']);
    }
  }

  login(): void {
    if (this.LogInForm.valid) {
      const credentials = {
        email: this.LogInForm.value.email,
        password: this.LogInForm.value.password
      };

      this.apiservice.http.post<any>(`${this.apiservice.baseUrl}/user/userLogin`, credentials)
        .subscribe(
          response => {
            if (response.success) {
              this.authService.login(response.jwttoken); 
              this.router.navigate(['UsersProfile']);
            } else {
              alert('Invalid email or password. Please try again.');
            }
          },
          error => {
            console.error('Error during login:', error);
            alert('Failed to login. Please try again.');
          }
        );
    } else {
      alert('Please fill in all required fields and ensure they are valid.');
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
