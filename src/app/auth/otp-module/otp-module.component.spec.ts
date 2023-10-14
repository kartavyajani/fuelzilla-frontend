import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpModuleComponent } from './otp-module.component';

describe('OtpModuleComponent', () => {
  let component: OtpModuleComponent;
  let fixture: ComponentFixture<OtpModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
