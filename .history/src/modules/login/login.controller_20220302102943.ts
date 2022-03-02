import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard, AuthenticatedGuard } from '../../common/guards';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';
import { Request } from 'express';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Session() session,
    @Res() res,
  ) {
    return await this.loginService.login(loginDto, req, session, res);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('log-out')
  async logOut(@Req() request: Request) {
    request.logOut();
    request.session.cookie.maxAge = 0;
  }
}
