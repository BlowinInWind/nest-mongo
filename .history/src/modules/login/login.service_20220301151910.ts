import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';

@Injectable()
export class LoginService {
  async login(loginDto: LoginDto, req: Request) {
    return req.user?._doc;
  }
}
