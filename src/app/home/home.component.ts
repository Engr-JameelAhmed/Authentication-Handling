import { Component, OnInit, Renderer2 } from '@angular/core';
import { HomeServiceService } from '../services/home-service.service';
import { GoogleLoginData, JwtToken } from '../signotppopup/signotppopup.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [HomeServiceService]
})
export class HomeComponent {
  // constructor(private render: Renderer2, private homeService: HomeServiceService){}



  // ngOnInit(): void {
  //     const script = this.render.createElement('script');
  //     script.src = "https://accounts.google.com/gsi/client";
  //     script.onload = () => {
  //       console.log("script loaded");
  //     }
  //     script.onerror = (error: any) => {
  //       console.error("script error ", error);
  //     }
  //     this.render.appendChild(document.body, script);
  // }

  // ngAfterViewInit(): void {

  //   (window as any)['handleOauthResponse'] = (response: unknown) => {
  //     const responseObj = response as any;
  //     debugger
  //     if(responseObj && responseObj.credential){
  //       const responsePayload = this.decodeJWTToken(responseObj.credential);
  //       // console.log(responsePayload);
  //       // console.log(responsePayload.email);
  //       this.loginSignUpWithGoogle(responsePayload.name, responsePayload.email)
  //     }else{
  //       console.error("Invalid format ", response);
  //     }
  //   }

  // }

  // loginSignUpWithGoogle(userName: string, userEmail: string){
  //   let user: GoogleLoginData = {
  //     userName: userName,
  //     email:userEmail
  //   }

  //   console.log(this.homeService.GooglesignUpUser(user));
  //   debugger
  //   this.homeService.GooglesignUpUser(user).subscribe(
  //     (response: JwtToken) => {
  //       console.log('Response is : ',response);
  //       debugger
  //       localStorage.setItem('refereshToken', response.refereshToken);
  //       localStorage.setItem('userEmail', response.userEmail);
  //       localStorage.setItem('userName', response.userName);
  //       debugger
  //     },
  //     (error) => {
  //       console.error("error fetching data", error);
  //     }
  //   )
  // }

  // decodeJWTToken(token: string): any{
  //   return JSON.parse(atob(token.split(".")[1]))
  // }


}
