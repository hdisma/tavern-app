import { AuthService } from './../../../core/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout-callback-redirect',
  templateUrl: './signout-callback-redirect.component.html',
  styleUrls: ['./signout-callback-redirect.component.scss']
})
export class SignoutCallbackRedirectComponent implements OnInit {

  constructor(private _router: Router, private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.signoutRedirectCallback().then(_ => {
      this._router.navigate(['/'], { replaceUrl: true });
    });
  }

}
