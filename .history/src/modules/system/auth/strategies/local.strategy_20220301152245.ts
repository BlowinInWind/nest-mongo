import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'passwd',
      passReqToCallback: true, //设置回调函数第一个参数为 request
    });
  }

  async validate(_, username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    console.log(user);
    // const user = await this.authService.validateUser(username, password);
    return user;
  }
}
