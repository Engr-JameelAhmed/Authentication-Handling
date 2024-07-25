import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'
import { AppConstants } from '../constants/app-contants';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { GoogleLoginData, JwtToken, SignotppopupComponent } from '../signotppopup/signotppopup.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeServiceService } from '../services/home-service.service';

@Component({
  selector: 'app-app-bar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,MatFormFieldModule, MatInputModule, FormsModule, HttpClientModule],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.css',
  providers: [HomeServiceService]
})
export class AppBarComponent implements OnInit{

  animal: string;
  name: string;

  constructor(public dialog: MatDialog, private render: Renderer2, private homeService: HomeServiceService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(SignotppopupComponent, {
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  appName = AppConstants.APPLICATION_NAME;

  isSticky = false;
  @HostListener('window:scroll', ['$event'])
  checkScroll(){
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.isSticky = scrollPosition >= 50;  // adjust as needed
  }





  ngOnInit(): void {
      const script = this.render.createElement('script');
      script.src = "https://accounts.google.com/gsi/client";
      script.onload = () => {
        console.log("script loaded");
      }
      script.onerror = (error: any) => {
        console.error("script error ", error);
      }
      this.render.appendChild(document.body, script);
  }

  ngAfterViewInit(): void {

    (window as any)['handleOauthResponse'] = (response: unknown) => {
      const responseObj = response as any;
      debugger
      if(responseObj && responseObj.credential){
        const responsePayload = this.decodeJWTToken(responseObj.credential);
        // console.log(responsePayload);
        // console.log(responsePayload.email);
        this.loginSignUpWithGoogle(responsePayload.name, responsePayload.email)
      }else{
        console.error("Invalid format ", response);
      }
    }

  }

  loginSignUpWithGoogle(userName: string, userEmail: string){
    let user: GoogleLoginData = {
      userName: userName,
      email:userEmail
    }

    console.log(this.homeService.GooglesignUpUser(user));
    this.homeService.GooglesignUpUser(user).subscribe(
      (response: JwtToken) => {
        console.log('Response is : ',response);
        localStorage.setItem('refereshToken', response.refereshToken);
        localStorage.setItem('userEmail', response.userEmail);
        localStorage.setItem('userName', response.userName);
      },
      (error) => {
        console.error("error fetching data", error);
      }
    )
  }

  decodeJWTToken(token: string): any{
    return JSON.parse(atob(token.split(".")[1]))
  }

}
