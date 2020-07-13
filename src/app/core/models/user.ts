import { Role } from "./role";

export class User {
  id?: number;
  birthyear?: number;
  safeid?: string;
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
  access_token?: string;
  mustVerify?: string;
}
