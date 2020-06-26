import { Role } from "./role";

export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: Role;
  token?: string;
  mustVerify?: string;
}
