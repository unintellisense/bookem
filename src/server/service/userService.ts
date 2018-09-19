import { User } from '../db/user';
import { IdentityProviderType, IUser } from '../../shared/dto/iuser'

type UserPayload = Partial<{ [field in keyof IUser]: IUser[field] }>

export async function GetGoogleUser(googleIdentifier: string) {
  let users = await User.query()
    .where('externalProvider', '=', IdentityProviderType.Google)
    .andWhere('externalIdentifier', '=', googleIdentifier);
  if (users.length > 1) throw new Error(`Expected 1 result, got ${users.length}`);
  return users[0] || null;
}

export async function CreateGoogleUser(payload: UserPayload) {
  let { firstName, lastName, email, externalIdentifier } = payload;
  let now = new Date();
  let newUser = await User.query()
    .insert({
      externalProvider: IdentityProviderType.Google,
      externalIdentifier: externalIdentifier,
      creationDate: now,
      lastLogin: now,
      firstName, lastName, email
    });

  return newUser;

}

export async function UpdateGoogleUser(googleIdentifier: string, payload: UserPayload) {
  let patchCnt = await User.query()
    .patch(payload)
    .where('externalProvider', '=', IdentityProviderType.Google)
    .andWhere('externalIdentifier', '=', googleIdentifier);
  if (patchCnt === 0) return null;
  return GetGoogleUser(googleIdentifier);
}

export async function DeleteGoogleUser(googleIdentifier: string) {
  let deleteCount = await User.query()
    .where('externalProvider', '=', IdentityProviderType.Google)
    .andWhere('externalIdentifier', '=', googleIdentifier)
    .delete();
  
  if (deleteCount == 0) throw { code: 404 };

}