import { Role } from './role-model';

export class User {
  username: string;
  role: Role;
  token?: string;
}
