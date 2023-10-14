import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { CommonMessages } from 'src/app/shared/helpers/commonMessages';
// import { NotificationMessagesService } from 'src/app/shared/helpers/notification-messages';
// import { AuthFacade } from '../../auth.facade';

import { map } from 'rxjs';
import { CaptchaComponent } from '../captcha/captcha.component';
// import { CaptchaComponent } from 'src/app/core/shared-control/components/captcha/captcha.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {


  masterForm!: FormGroup;
  loading = false;
  userData: any = [];
  captcha: any;

  captchaConfig: any = {
    type: 1,
    length: 6,
    cssClass: 'custom',
    back: {
      stroke: "#2F9688",
      solid: "#f2efd2"
    },
    font: {
      color: "#000000",
      size: "35px"
    }
  };

  @ViewChild(CaptchaComponent, { static: false }) captchaComponent!:CaptchaComponent;

  constructor( private router: Router, private formBuilder: FormBuilder
  ) {
    // this.authFacade.getTheLoginUrl(this.router.url);
  }
  invalidCaptchaMessage: string | null = null; 

  isCaptchaValid = false;

  ngOnInit(): void {

    localStorage.clear();

    sessionStorage.clear()
    this.masterForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      clientid:['', Validators.required],
      captcha: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
    })

    this.masterForm.valueChanges.pipe(
      map(values => {
        // Modify the values as needed
        const modifiedValues = { ...values };
        modifiedValues.captcha = modifiedValues.captcha.toUpperCase();
        return modifiedValues;
      })
    ).subscribe(modifiedValues => {
      this.masterForm.patchValue(modifiedValues, { emitEvent: false });
    });

  // Add event listener for Enter key press
  const formElement = document.getElementById('login-form');
  formElement?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && this.masterForm.valid) {
      this.submit();
    }
  });

  }

  isFieldInvalid(field: string) {

    return (
      (!this.masterForm.get(field)?.valid && this.masterForm.get(field)?.touched)
    );
  }

  setCaptchaCode(captcha: any) {
    console.log("captcha code from CAS: ", captcha);
    this.captcha = captcha
    this.isCaptchaValid = true;
  }

  async submit() {

    console.log("form value: ", this.masterForm.value);
    console.log('this.masterForm.valid: ', this.masterForm.valid);

    

    if (this.masterForm.value.userName != null && this.masterForm.value.password != null && this.masterForm.value.clientid != null) {

      if (this.captcha !== this.masterForm.get('captcha')?.value) {
        // this.notifyService.showError(this.commonMessages.INVALID_CAPTCHA, '');
        this.captchaComponent.createCaptcha()
        this.masterForm.get('captcha')?.setValue('')
        this.masterForm.get('captcha')?.markAsUntouched()
        console.log("invalid captcha");
        this.invalidCaptchaMessage = "Invalid CAPTCHA"; 
        return
      } 

      this.loading = true;

      const loginPayload = {
        "userName": this.masterForm.get('userName')?.value,
        "password": this.masterForm.get('password')?.value,
        "authenticationType": "database",
        // "deviceType": this.authFacade.getDeviceInfo()
      }

      console.log("loginPayload: ", loginPayload);

      // const casLoginRes: any = await this.authFacade.doLogin(loginPayload);

      // console.log("casLoginRes: ", casLoginRes);

      // if (_.has(casLoginRes, 'error')) {

      //   const errorMsg = casLoginRes['error_description']

      //   console.log('error message: ', errorMsg);

      //   this.notifyService.showError(errorMsg, "")
      //   this.loading = false;
      //   return
      // }

      // TODO: Need to think on the setting the access management parameter
      // sessionStorage.setItem('userName', casLoginRes.roles[0].userName);
      // sessionStorage.setItem('roleName', casLoginRes.roles[0].roleName);
      // sessionStorage.setItem('roleId', casLoginRes.roles[0].roleId);
      // localStorage.setItem('roles', JSON.stringify(casLoginRes.roles));
      // localStorage.setItem('token', casLoginRes.access_token);
      // localStorage.setItem('userId', casLoginRes.roles[0].userId);
      // localStorage.setItem('branchId', casLoginRes.roles[0].branch_id);
      // localStorage.setItem('parent_branch_id', casLoginRes.roles[0].parent_branch_id);

      this.loading = false;

      // Navigating To Dashboard
      this.router.navigate(['otp']);

    }

  }

}