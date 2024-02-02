import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_ROLES } from '../decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const handlerRoles: string[] =
      this.reflector.get<string[]>(CHECK_ROLES, context.getHandler()) || [];
    const classRoles: string[] =
      this.reflector.get<string[]>(CHECK_ROLES, context.getClass()) || [];

    const authorizedRoles = [...handlerRoles, ...classRoles];
    if (!authorizedRoles.length) return true;

    const authUser = context.switchToHttp().getRequest().user;

    const authUserRole = authUser?.role;
    if (!authUserRole) throw new UnauthorizedException();

    const isAuthorized = authorizedRoles.some((role) => role === authUserRole);
    if (isAuthorized) return true;
    console.log('isAuthorized', isAuthorized);

    throw new ForbiddenException('You are not allowed to perform this action');
  }
}
