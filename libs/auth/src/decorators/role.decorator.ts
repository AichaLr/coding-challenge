import { SetMetadata } from '@nestjs/common';

export const CHECK_ROLES = 'check_roles';

export const Roles = (...requirements: string[]) =>
  SetMetadata(CHECK_ROLES, requirements);
