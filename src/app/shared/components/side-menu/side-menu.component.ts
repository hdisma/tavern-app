import { UserAuth } from './../../../core/models/user-auth';
import { AuthService } from './../../../core/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  public isLoggedIn: boolean = false;
  public userAuth: UserAuth = new UserAuth();

  constructor(private _authService: AuthService) {
    this._authService.loginChanged$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
    this._authService.authContextLoaded$.subscribe(authContext =>{
      this.userAuth = authContext.userAuth;
    });
  }

  ngOnInit(): void {
    this._authService.isLoggedIn().then(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  public login(){
    this._authService.login();
  }

  public logout(){
    this._authService.logout();
  }
}
