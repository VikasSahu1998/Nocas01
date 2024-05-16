import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './Users/forgot-password/forgot-password.component';
import { UsersHomeComponent } from './Users/users-home/users-home.component';
import { UsersLoginComponent } from './Users/users-login/users-login.component';
import { UsersNOCASComponent } from './Users/users-nocas/users-nocas.component';
import { UsersPricingPlansComponent } from './Users/users-pricing-plans/users-pricing-plans.component';
import { UsersProfileComponent } from './Users/users-profile/users-profile.component';
import { UsersRegisterComponent } from './Users/users-register/users-register.component';
import { UsersrequestServiceComponent } from './Users/usersrequest-service/usersrequest-service.component';



const routes: Routes = [
  { path: '', component: UsersHomeComponent },
  { path: 'UsersRegister', component: UsersRegisterComponent },
  { path: 'UsersLogin', component: UsersLoginComponent },
  { path: 'UsersProfile', component: UsersProfileComponent },
  { path: 'PricingPlans', component: UsersPricingPlansComponent },
  { path: 'C_NOCAS-MAP', component: UsersNOCASComponent },
  { path: 'forgot-pass', component: ForgotPasswordComponent },
  { path: 'request-Service', component: UsersrequestServiceComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect any other routes to the home page
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
