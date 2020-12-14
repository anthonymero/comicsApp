
export interface IUser {
  uid: string;
  email: string;
  displayName: string;
  emailVerified: boolean;
  photoURL?: string;
  favoriteCollection?: string;
  favoriteStyle?: string;
}
