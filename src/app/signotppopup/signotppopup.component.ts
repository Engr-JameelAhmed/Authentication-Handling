import {Component, Inject} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,

} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SignUpServiceService } from '../services/sign-up-service.service';
import { UserResponse } from '../Model/User';

export interface DialogData {
  username: string;
  password: string;
}

export interface GoogleLoginData {
  userName: string;
  email: string;
}

export interface RegisterationData {
  userName: string;
  userEmail: string;
  userMobile: string;
  userAddress: string;
  userPassword: string;
}
export interface JwtToken {
  refereshToken: string;
  userName: string;
  userEmail: string;
}

@Component({
  selector: 'app-signotppopup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    HttpClientModule, CommonModule,
    MatDividerModule


  ],
  templateUrl: './signotppopup.component.html',
  styleUrl: './signotppopup.component.css',
  providers: [SignUpServiceService]
})

export class SignotppopupComponent {

  isSignUpOrLogin: boolean = true;
  // service: SignUpServiceService = inject(SignUpServiceService)

  constructor(
    public dialogRef: MatDialogRef<SignotppopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    @Inject(MAT_DIALOG_DATA) public registerationData: RegisterationData,
    private service: SignUpServiceService
  ) {}

  login(){
    let user: UserResponse = {
      userName: this.data.username,
      userPassword: this.data.password
    }
    debugger
    this.service.signInUser(user).subscribe(
      (response: JwtToken) => {
        console.log(response);
        localStorage.setItem('refereshToken', response.refereshToken);
        localStorage.setItem('userEmail', response.userEmail);
        localStorage.setItem('userName', response.userName);
        debugger
        this.onNoClick();
      },
      (error) => {
        console.error("error fetching data", error);
      }
    );
  }

  SignUp(){
    this.service.signUpUser(this.registerationData).subscribe(
      (response) => {
        debugger
        console.log(response);
        this.onNoClick();
        this.isSignUpOrLogin = true;
      },
      (error) => {
        console.error("error fetching data", error);
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openLogin(){
    this.isSignUpOrLogin = true;
  }
  openSignUp(){
    this.isSignUpOrLogin = false;
  }

}
