import { AuthService } from './../../../core/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-callback-redirect',
  templateUrl: './signin-callback-redirect.component.html',
  styleUrls: ['./signin-callback-redirect.component.scss']
})
export class SigninCallbackRedirectComponent implements OnInit {

  constructor(private _router: Router, private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.signinRedirectCallback().then(_ => {
      this._router.navigate(['/'], { replaceUrl: true });
    });
  }

}
