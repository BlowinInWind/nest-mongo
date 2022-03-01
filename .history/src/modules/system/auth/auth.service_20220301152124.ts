import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(username, password) {
    return await this.userService.findUserByNameAndPasswd(username, password);
  }
}
