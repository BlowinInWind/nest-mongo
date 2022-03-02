import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './global/global.module';
import * as path from 'path';
import { LoginModule } from './modules/login/login.module';
import { AuthModule } from './modules/system/auth/auth.module';
import { UserModule } from './modules/system/user/user.module';
import { GroupsModule } from './modules/system/groups/groups.module';
import { RolesModule } from './modules/system/roles/roles.module';
import { RulesModule } from './modules/system/rules/rules.module';

const devPath = path.resolve(process.cwd(), '.env');

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: devPath }),
    GlobalModule,
    LoginModule,
    AuthModule,
    UserModule,
    GroupsModule,
    RolesModule,
    RulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
