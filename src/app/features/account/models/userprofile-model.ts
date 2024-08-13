export interface IUserProfile {
  //this is the interface for the user profile
  Id: string;
  Firstname: string;
  Lastname: string;
  Email: string;
  Institution: string | null;
  IsAdmin: boolean;
  Username: string;
}
