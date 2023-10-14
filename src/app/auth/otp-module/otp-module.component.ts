import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-module',
  templateUrl: './otp-module.component.html',
  styleUrls: ['./otp-module.component.scss']
})
export class OtpModuleComponent implements OnInit {
  public settings = {
    length: 4,
    numbersOnly: true,
    timer: 60,
    timerType: 2,
  };
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  enteredOtp:any;
  isotpComplete=false
  public onInputChange(e:any) {
    console.log(e);
    if (e.length == this.settings.length) {
      // e will emit values entered as otp and,
      console.log('otp is', e);
      this.isotpComplete=true;

      this.enteredOtp = e; 
    } else if (e == -1) {
      // if e == -1, timer has stopped
      console.log(e, 'resend button enables');
    } else if (e == -2) {
      // e == -2, button click handle
      console.log('resend otp');
    }
  }
  public submitOtp() {
    // Handle OTP submission logic here
    // You can access the entered OTP using this.otpValue
    if(this.isotpComplete){
    console.log('OTP submitted: ' + this.enteredOtp);
    this.router.navigate(["dashboard"]);
    }
  }
  


}
