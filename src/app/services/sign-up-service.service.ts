import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../Model/User';
import { RegisterationData } from '../signotppopup/signotppopup.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignUpServiceService {

  private baseUrl = 'http://localhost:9093';
  private authUrl = 'http://localhost:9094/auth'
  private UserBaseUrl = '/user';
  private generateToken = '/generateToken'

  constructor(private http: HttpClient) { }

  signInUser(user: UserResponse): Observable<any> {
    debugger
    var end = this.http.post<any>(`${this.authUrl}${this.generateToken}`,user);
    return end;
  }

  signUpUser(user: RegisterationData): Observable<any> {
    var end = this.http.post<any>(`${this.baseUrl}${this.UserBaseUrl}/`,user);
    return end;
  }

}
