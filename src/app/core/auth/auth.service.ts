import { UserAuth } from './../models/user-auth';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User, UserManager, UserManagerSettings } from 'oidc-client';
import { AsyncSubject, Observable, Subject } from 'rxjs';
import { AuthContext } from '../models/auth-context';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userManager: UserManager;
  private _user: User | undefined | null;
  public authContext: AuthContext = new AuthContext;

  private _loginChangedSubject = new Subject<boolean>();
  private _authContextSubject = new AsyncSubject<AuthContext>();

  public loginChanged$: Observable<boolean> = this._loginChangedSubject.asObservable();
  public authContextLoaded$: Observable<AuthContext> = this._authContextSubject.asObservable();

  constructor(private _httpClient: HttpClient) {

    var identityServerSettings: UserManagerSettings = {
      authority: environment.authorityServer,
      client_id: environment.clientId,
      redirect_uri: `${environment.clientRootPath}/signin-callback`,
      scope: 'openid profile tavern-api',
      response_type: 'code', // or in case of implicit flow use -> 'id_token token'
      post_logout_redirect_uri: `${environment.clientRootPath}/signout-callback`,
      automaticSilentRenew: true,
      silent_redirect_uri: `${environment.clientRootPath}/assets/silent-callback.html`
    };

    this._userManager = new UserManager(identityServerSettings);

    this._userManager.events.addUserLoaded(user => {
      if (this._user !== user) {
          this._user = user;
          this._loginChangedSubject.next(!!user && !user.expired);
          this.loadSecurityContext();
      }
    });
  }

  public login(): Promise<void> {
    return this._userManager.signinRedirect();
  }

  public logout(): Promise<void> {
    return this._userManager.signoutRedirect();
  }

  public isLoggedIn(): Promise<boolean> {
    return this._userManager.getUser().then(user => {
        const currentUser = !!user && !user.expired;
        if (this._user !== user) {
          this._loginChangedSubject.next(currentUser);
        }
        if (currentUser) {
          this.loadSecurityContext();
        }
        this._user = user;
        return currentUser;
    });
}

  public signinRedirectCallback() {
    return this._userManager.signinRedirectCallback().then(user => {
       this._user = user;
       this._loginChangedSubject.next(!!user && !user.expired);
       this.loadSecurityContext();
       return user;
    });
  }

  public signoutRedirectCallback() {
    this._user = null;
    this._loginChangedSubject.next(false);
    return this._userManager.signoutRedirectCallback();
  }

  public getAccessToken() {
    return this._userManager.getUser().then(user => {
        if (!!user && !user.expired) {
            return user.access_token;
        } else {
            return null;
        }
    });
  }

  public loadSecurityContext(): void {

    this._userManager.getUser().then(user => {

      this.authContext = new AuthContext();
      this.authContext.userProfile.id = user?.profile.sub!;
      this.authContext.userProfile.userName = user?.profile.username;

      // Add user roles to AuthContext.roles array property
      user?.profile.roles.forEach((role: string) =>
        this.authContext.roles.push({ name: role })
      );

      // Add permissions to AuthContext.permissions array property
      user?.profile.permissions.forEach((permission: string) =>
        this.authContext.permissions.push({ name: permission })
      );

      // set to true AuthContext.userAuth properties based on permissions
      this.authContext.permissions.map(p => {
        if(p.name in this.authContext.userAuth){
          let permission = p.name as keyof typeof UserAuth.prototype;
          this.authContext.userAuth[permission] = true;
        }
      });

      this._authContextSubject.next(this.authContext);
      this._authContextSubject.complete();
    });
  }
}
