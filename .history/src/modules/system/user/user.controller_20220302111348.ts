import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { FindOneUserParams } from './dto/user.dto';
import { DataObj } from 'src/common/class';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  async list() {
    return await this.userService.list();
  }

  @Get('/:userId')
  async getUserById(@Param() findOneUserParams: FindOneUserParams) {
    const result = await this.userService.findUserById(
      findOneUserParams.userId,
    );
    return new DataObj(result);
  }
}
