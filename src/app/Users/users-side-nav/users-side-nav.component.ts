import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../Shared/Api/api.service';
import { AuthServiceService } from '../Shared/Api/auth-service.service';
import { count } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-users-side-nav',
  templateUrl: './users-side-nav.component.html',
  styleUrl: './users-side-nav.component.scss'
})
export class UsersSideNavComponent implements OnInit {
  constructor(private authService: AuthServiceService , private http: HttpClient, public apiservice: ApiService, private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['UserLogin']); 
      return;
    }
    this.getUserDetails();
  }
  user: any = {};

  logout() {
    this.authService.logout();
    window.location.reload();
    this.router.navigate(['UsersLogin']);
  }
  getUserDetails(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['UsersLogin']);
      return;
    }
  
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authService.getToken()}`);
  
    this.http.post<any>('http://localhost:3001/api/user/myProfile', {}, { headers })
      .subscribe(
        response => {
          this.apiservice.userData = JSON.parse(JSON.stringify(response))
          // this.updatedUser = JSON.parse(JSON.stringify(response))
          this.user = JSON.parse(JSON.stringify(response))
        },
        error => {
          console.error('Error fetching user profile:', error);
          if (error.status === 401) {
            alert('Unauthorized access. Please log in again.');
            this.authService.logout(); // Logout user if unauthorized
            this.router.navigate(['UserLogin']);
          } else {
            alert('Failed to fetch user profile. Please try again.');
          }
        }
      );
  }
  
  navigateToProfile() {
    this.router.navigate(['UsersProfile']);
  }
}

