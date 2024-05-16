import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../Shared/Api/api.service';
import { AuthServiceService } from '../Shared/Api/auth-service.service';




@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrl: './users-profile.component.scss'
})
export class UsersProfileComponent implements OnInit {
  user: any = {};
  updatedUser: any = {};
  currentPassword: string = '';
  newPassword: string = '';
 
  confirmPassword: string = '';
  passwordsMatch: boolean = false;






  constructor(private route: ActivatedRoute,private authService: AuthServiceService , private http: HttpClient, public apiservice: ApiService, private router: Router) { }

  ngOnInit(): void {
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['UserLogin']); // Redirect to login if not authenticated
      return;
    }
    this.getUserDetails();
  }
  
  imageUrl: string = '';
  imageName: string = '';
  selectedFile: File | undefined;
  airports: any[] = []; // Variable to store airport data

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;

    // Set the image name
    this.imageName = file.name;

    // Optionally, if you also want to display the image preview:
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imageUrl = reader.result as string;
    };
  }


  saveChanges(): void {
    console.log(this.updatedUser)
    this.http.put<any>('http://localhost:3001/api/user/updateUser', this.updatedUser)
      .subscribe(
        response => {
          this.apiservice.userData = JSON.parse(JSON.stringify(response.updatedUser))
          console.log(response)
          this.updatedUser = JSON.parse(JSON.stringify(response.updatedUser))
          this.user = JSON.parse(JSON.stringify(response.updatedUser))

          alert(response.message)
        },
        error => {
          console.error('Error updating profile:', error);
          alert('Failed to update profile. Please try again.');
        }
      );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['UserLogin']);
  }

  navigateToProfile() {
    this.router.navigate(['users-profile']);
  }


  // changePassword(): void {
  //   if (this.newPassword !== this.renewPassword) {
  //     alert('New passwords do not match.');
  //     return;
  //   }

  //   const passwordData = {
  //     currentPassword: this.currentPassword,
  //     newPassword: this.newPassword
  //   };

  //   this.http.post<any>('http://localhost:3001/api/changePassword', passwordData)
  //     .subscribe(
  //       response => {
  //         alert(response.message);
  //       },
  //       error => {
  //         console.error('Error changing password:', error);
  //         alert('Failed to change password. Please try again.');
  //       }
  //     );
  // }

  getUserDetails(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['UserLogin']);
      return;
    }
  
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authService.getToken()}`);
  
    this.http.post<any>('http://localhost:3001/api/user/myProfile', {}, { headers })
      .subscribe(
        response => {
          this.apiservice.userData = JSON.parse(JSON.stringify(response))
          this.updatedUser = JSON.parse(JSON.stringify(response))
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
  
  validatePassword() {
    // Check if the paswords match
    this.passwordsMatch = this.newPassword  === this.confirmPassword  && !!this.newPassword;
}


changePassword(): void {

  const headers = new HttpHeaders().set("Authorization", `Bearer ${this.apiservice.token}`);
  let passwordData = {currentPassword:this.currentPassword,newPassword:this.confirmPassword}
  console.log(passwordData)
  this.http.post<any>('http://localhost:3001/api/user/changePassword', passwordData, { headers: headers })
    .subscribe(
      response => {
        // this.apiservice.userData = JSON.parse(JSON.stringify(response))
        // // console.log(response)
        // this.updatedUser = JSON.parse(JSON.stringify(response))
        // this.user = JSON.parse(JSON.stringify(response))
       alert(response.message)


      },
      error => {
        alert(error)
        
      }
    )

}
}