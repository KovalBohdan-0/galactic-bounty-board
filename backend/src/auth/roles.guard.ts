import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../users/user.entity';

export interface CustomRequest extends Request {
  user?: User;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string>('role', ctx.getHandler());
    if (!requiredRole) return true;

    const request = ctx.switchToHttp().getRequest<CustomRequest>();
    const user: User = request.user!;

    return user?.role === requiredRole;
  }
}
