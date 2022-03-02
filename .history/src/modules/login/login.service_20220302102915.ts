import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { Session } from 'express-session';

@Injectable()
export class LoginService {
  async login(loginDto: LoginDto, req: Request, session: Session) {
    session.regenerate((e) => {
      console.log(e);
      // @ts-ignore
      session.user = req.user;
    });

    res.json({ code: 0, msg: '登录成功' });
    // return req.user;
  }
}
