import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from '../../user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UserService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void) {
    done(null, { _id: user.id });
  }

  async deserializeUser(userId: any, done: (err: Error, payload: any) => void) {
    const user = await this.usersService.findUserById(userId.id);

    done(null, user);
  }
}
