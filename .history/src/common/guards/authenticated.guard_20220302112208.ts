import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from '../constants';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // 如果有Public的装饰器就不需要验证登录
    const publicStatus = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (publicStatus) {
      return true;
    }

    return request.isAuthenticated();
  }
}
