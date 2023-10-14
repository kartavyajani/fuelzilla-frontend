import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CaptchaComponent } from './auth/captcha/captcha.component';
import { AngularOtpLibModule } from 'angular-otp-box';
import { OtpModuleComponent } from './auth/otp-module/otp-module.component';

import { MenuPanelComponent } from './auth/menu-panel/menu-panel.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatDrawer } from '@angular/material/sidenav';
import { SidenavComponent } from './auth/sidenav/sidenav.component';
import { BodyComponent } from './body/body.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { PagesComponent } from './pages/pages.component';
import { MediaComponent } from './media/media.component';
import { SettingsComponent } from './settings/settings.component';
import { SublevelMenuComponent } from './auth/sidenav/sublevel-menu.component';


// import { MatErrorModule } from '@angular/material/error';

// import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material'; // Import Angular Material modules

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CaptchaComponent,
    OtpModuleComponent,
    SidenavComponent,
    BodyComponent,
 
    DashboardComponent,
    StatisticsComponent,
    PagesComponent,
    MediaComponent,
    SettingsComponent,
    SublevelMenuComponent,

    MenuPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
  MatInputModule,
  AngularOtpLibModule,
  MatToolbarModule, // Add other imported modules here
  MatMenuModule,
  MatIconModule,
  MatSidenavModule,
  MatExpansionModule,
  MatListModule,


  // MatErrorModule,

    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
