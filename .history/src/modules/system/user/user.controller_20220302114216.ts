import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { FindOneUserParams } from './dto/user.dto';
import { DataObj } from 'src/common/class';
import { Public } from 'src/common/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async list('list') {
    return await this.userService.list();
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
