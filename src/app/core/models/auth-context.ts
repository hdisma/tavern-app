import { UserAuth } from './user-auth';
import { Role } from './role';
import { Permission } from './permission';
import { UserProfile } from './user-profile';

export class AuthContext {
  userProfile: UserProfile = new UserProfile();
  userAuth: UserAuth = new UserAuth();
  permissions: Array<Permission> = [];
  roles: Array<Role> = [];

  get isAdmin(): boolean {
      let result: boolean = !!this.roles && !!this.roles.find(role => role.name === 'Admin');
      return result;
  }
}
