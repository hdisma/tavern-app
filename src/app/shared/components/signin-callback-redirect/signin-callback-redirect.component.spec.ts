import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninCallbackRedirectComponent } from './signin-callback-redirect.component';

describe('SigninCallbackRedirectComponent', () => {
  let component: SigninCallbackRedirectComponent;
  let fixture: ComponentFixture<SigninCallbackRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninCallbackRedirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninCallbackRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
