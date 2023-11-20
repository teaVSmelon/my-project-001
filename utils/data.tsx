export enum User {
  UserID = "user_id",
  UserName = "user_name",
  UserPassword = "user_password",
  Money = "money",
}

export interface UserData {
  [User.UserID]: string;
  [User.UserName]: string;
  [User.UserPassword]: string;
  [User.Money]: number;
}
