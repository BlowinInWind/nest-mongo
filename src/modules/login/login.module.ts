import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UserModule } from '../system/user/user.module';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule, UserModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
