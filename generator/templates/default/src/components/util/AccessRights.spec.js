import InternalUser from '../../models/ActiveDirectoryUser';
import { userGroups, userIsAuthorized } from './AccessRights';

describe('Access rights', () => {
  test('it should grant access if the current user is in the allowed user groups', () => {
    const allowedUserGroups = [userGroups.HEAD_OF_SALES];
    const internalUser = new InternalUser();
    internalUser.groups = [userGroups.SALES];

    const access = userIsAuthorized(allowedUserGroups, internalUser);
    expect(access).toBe(false);
  });

  test('it should deny access if the current user is not in the allowed user groups', () => {
    const allowedUserGroups = [userGroups.HEAD_OF_SALES];
    const internalUser = new InternalUser();
    internalUser.groups = [userGroups.HEAD_OF_SALES];

    const access = userIsAuthorized(allowedUserGroups, internalUser);
    expect(access).toBe(true);
  });

  test('it should always grant access if the current user is in the admin user group', () => {
    const allowedUserGroups = [userGroups.HEAD_OF_SALES];
    const internalUser = new InternalUser();
    internalUser.groups = [userGroups.ADMIN];

    const access = userIsAuthorized(allowedUserGroups, internalUser);
    expect(access).toBe(true);
  });
});
