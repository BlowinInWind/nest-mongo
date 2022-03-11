import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Get,
  Query,
  Redirect,
} from '@nestjs/common';
import { LocalAuthGuard, AuthenticatedGuard } from '../../common/guards';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';
import { Request } from 'express';
import { Public } from 'src/common/decorators';
import { DataObj } from 'src/common/class';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller()
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly httpService: HttpService,
  ) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto, @Req() req: Request) {
    const result = await this.loginService.login(loginDto, req);
    return new DataObj(result);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  async logOut(@Req() request: Request) {
    request.logOut();
    request.session.cookie.maxAge = 0;
  }

  @Get('/api/user/oauth')
  @Redirect('http://127.0.0.1:3000', 301)
  @Public()
  async githubOauth(@Query('code') code: string) {
    const clientId = 'Iv1.582917c633d1b20e';
    const clientSecret = 'c7bd2ef4c8cae62967b6b270affa78a83b3c88d1';

    const result = await firstValueFrom(
      await this.httpService.post(
        `http://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
        },
      ),
    );

    const user = await firstValueFrom(
      await this.httpService.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${result.data.access_token}`,
          'User-Agent': 'easterCat',
        },
      }),
    );

    return { url: `http://localhost:3000/?user=zhangxinxin` };
  }
}
