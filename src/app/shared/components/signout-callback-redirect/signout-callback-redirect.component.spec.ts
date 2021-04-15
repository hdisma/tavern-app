import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoutCallbackRedirectComponent } from './signout-callback-redirect.component';

describe('SignoutCallbackRedirectComponent', () => {
  let component: SignoutCallbackRedirectComponent;
  let fixture: ComponentFixture<SignoutCallbackRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignoutCallbackRedirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoutCallbackRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
