import { ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  context: ExecutionContext;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.context = context;
    const result = (await super.canActivate(context)) as boolean;
    const request = await context.switchToHttp().getRequest();
    await super.logIn(request);

    return result;
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: any,
    status?: any,
  ): any {
    if (err || !user) {
      throw err;
    }
    return user;
  }
}
