
export interface IUser {
  uid: string;
  email: string;
  displayName: string;
  customDisplayName?: string;
  emailVerified: boolean;
  photoURL?: string;
  customPhotoURL?: string;
  favoriteCollection?: string;
  favoriteStyle?: string;
}
