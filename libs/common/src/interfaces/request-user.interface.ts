import { Request } from 'express';
import { Combine } from '../types/combine.type';
import { RoleEnum } from '@app/user/enums';

type PayloadUser = {
  user: {
    sub: string;
    role: RoleEnum;
    iat?: number;
    exp?: number;
  };
};

export type IRequestWithUser = Combine<Request, PayloadUser>;
