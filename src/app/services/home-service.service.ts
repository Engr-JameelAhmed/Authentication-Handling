import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleLoginData } from '../signotppopup/signotppopup.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  private baseUrl = 'http://localhost:9093';
  private userBaseUrl = `${this.baseUrl}/user`;
  private generateToken = '/generateToken';
  private googleSignUpController = '/loginSignUpWithGoogle';

  constructor(private http : HttpClient) { }


  GooglesignUpUser(user: GoogleLoginData): Observable<any> {
    return this.http.post<any>(`${this.userBaseUrl}${this.googleSignUpController}`,user);;
  }
}
