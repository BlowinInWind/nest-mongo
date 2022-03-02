import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Session,
} from '@nestjs/common';
import { LocalAuthGuard, AuthenticatedGuard } from '../../common/guards';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';
import { Request } from 'express';
import { Session as ExpressSession } from 'express-session';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto, @Req() req: Request) {
    return await this.loginService.login(loginDto, req);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  async logOut(@Req() request: Request, @Session() session: ExpressSession) {
    request.logOut();
    request.session.cookie.maxAge = 0;
  }
}
