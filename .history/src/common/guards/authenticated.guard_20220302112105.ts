import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // 如果有Public的装饰器就不需要验证登录
    const PublicStatus = this.reflector.getAllAndOverride(
      context.getClass(),
      context.getHandler(),
    );

    return request.isAuthenticated();
  }
}
