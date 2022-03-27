import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './global/global.module';
import * as path from 'path';
import { LoggerModule } from './common/logger';
import { LoginModule } from './modules/login/login.module';
import { AuthModule } from './modules/system/auth/auth.module';
import { UserModule } from './modules/system/user/user.module';
import { GroupsModule } from './modules/system/groups/groups.module';
import { RolesModule } from './modules/system/roles/roles.module';
import { RulesModule } from './modules/system/rules/rules.module';
import { PermissionsModule } from './modules/system/permissions/permissions.module';
import { LogMiddleware1 } from './common/middlewares';

const devPath = path.resolve(process.cwd(), '.env');

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: devPath }),
    GlobalModule,
    LoginModule,
    AuthModule,
    UserModule,
    GroupsModule,
    RolesModule,
    RulesModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware1).forRoutes('*');
  }
}
