import { RoleEnum } from '@app/user/enums';

export class TokenPayload {
  sub: string;
  role: RoleEnum;
  iat?: number;
  exp?: number;
}
