import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UserModule } from '../system/user/user.module';
import { GroupsModule } from '../system/groups/groups.module';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule, UserModule, GroupsModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
