import { Controller, Get, Inject, Param, Req, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { FindOneUserParams } from './dto/user.dto';
import { DataObj } from 'src/common/class';
import { Public } from 'src/common/decorators';
import { LoggerService } from 'src/common/logger';
import { LOGGER_MODULE_NEST_PROVIDER } from 'src/common/logger/logger.constants';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(LOGGER_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Get('list')
  async list(@Session() session, @Req() req) {
    this.logger.error('2222');

    const result = await this.userService.list();
    return new DataObj(result);
  }

  @Get('/:userId')
  @Public()
  async getUserById(@Param() findOneUserParams: FindOneUserParams) {
    const result = await this.userService.findUserById(
      findOneUserParams.userId,
    );
    return new DataObj(result);
  }
}
