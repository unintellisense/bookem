import { User, UserProviderType } from '../db/user';
import { UserSelfModifiable } from '../../shared/dto/iuser'

export async function GetGoogleUser(googleIdentifier: string) {
  let users = await User.query()
    .where('externalProvider', '=', UserProviderType.Google)
    .andWhere('externalIdentifier', '=', googleIdentifier);
  if (users.length > 1) throw new Error(`Expected 1 result, got ${users.length}`);
  return users[0] || null;
}


const newUserFields: (keyof UserSelfModifiable)[] = [
  'firstName',
  'lastName'
]

export async function CreateGoogleUser(googleIdentifier: string, firstName: string, lastName: string, email: string) {
  // lets make sure we arent creating a user
  // for a already existing Google user
  let existingGoogleUsers = await User.query()
    .where('externalProvider', '=', UserProviderType.Google)
    .where('externalIdentifier', '=', googleIdentifier);

  if (existingGoogleUsers.length > 0) { 
    throw new Error(`Found ${existingGoogleUsers.length} users with matching google identifier.`);
  }


  let newUser = await User.query()
    .insert({
      externalProvider: UserProviderType.Google,
      externalIdentifier: googleIdentifier,
      firstName, lastName, email
    });

  return newUser;

}