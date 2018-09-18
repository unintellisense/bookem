import { User } from '../db/user';
import { IdentityProviderType } from '../../shared/dto/iuser'

export async function GetGoogleUser(googleIdentifier: string) {
  let users = await User.query()
    .where('externalProvider', '=', IdentityProviderType.Google)
    .andWhere('externalIdentifier', '=', googleIdentifier);
  if (users.length > 1) throw new Error(`Expected 1 result, got ${users.length}`);
  return users[0] || null;
}

export async function CreateGoogleUser(googleIdentifier: string, firstName: string, lastName: string, email: string) {
  let now = new Date();
  let newUser = await User.query()
    .insert({
      externalProvider: IdentityProviderType.Google,
      externalIdentifier: googleIdentifier,
      creationDate: now,
      lastLogin: now,
      firstName, lastName, email
    });

  return newUser;

}

export async function DeleteGoogleUser(googleIdentifier: string) {
  let deleteCount = await User.query()
    .where('externalProvider', '=', IdentityProviderType.Google)
    .andWhere('externalIdentifier', '=', googleIdentifier)
    .delete();

  if (deleteCount == 0) throw { code: 404 };

}