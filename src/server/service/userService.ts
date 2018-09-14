import { User, UserProviderType } from '../db/user';

export async function GetGoogleUser(googleIdentifier: string) {
  let users = await User.query()
    .where('externalProvider', '=', UserProviderType.Google)
    .andWhere('externalIdentifier', '=', googleIdentifier);
  if (users.length > 1) throw new Error(`Expected 1 result, got ${users.length}`);
  return users[0] || null;
}