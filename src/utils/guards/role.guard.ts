
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { ROLE } from '../enum';
import { GetUser } from '../../auth/decorators/user.decorator';

@Injectable()

export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  
    if (!requiredRoles) {
      return true;
    }
    const {user} = context.switchToHttp().getRequest();
    console.log(user)
    return requiredRoles.some((role) => {
      user.role === role
    });
  }
}