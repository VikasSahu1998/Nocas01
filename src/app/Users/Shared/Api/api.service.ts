import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../Model/users/users';
import { Airport } from '../Model/users/airport';
import { Subscription } from '../Model/subscription';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  isAuthenticated: boolean = false;

  public baseUrl: string = 'http://localhost:3001/api';
  public loginUserId: string = "";
  public userData!: User;
  public token: string = "";
  public airportData!: Airport;
  static token: any;
  public subscriptionData!: Subscription;



  constructor(public http: HttpClient) {
    // this.baseUrl = 'http://localhost:3001/api';
  }

}
