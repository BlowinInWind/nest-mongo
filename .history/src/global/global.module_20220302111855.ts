import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GlobalService } from './global.service';
import { GlobalController } from './global.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '@nestjs-modules/ioredis';
import { AuthenticatedGuard } from 'src/common/guards';

@Global()
@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        config: {
          host: configService.get<any>('REDIS_HOST'),
          port: configService.get<any>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('DB_USER');
        const password = configService.get('DB_PASSWD');
        const dbDatabase = configService.get('DB_DATABASE');
        const host = configService.get('DB_HOST');
        const port = configService.get('DB_PORT');
        return {
          uri: `mongodb://${username}:${password}@${host}:${port}`,
          dbName: dbDatabase,
        };
      },
    }),
  ],
  controllers: [GlobalController],
  providers: [
    GlobalService,

    // 全局session登录拦截
    {
      provide: APP_GUARD,
      useClass: AuthenticatedGuard,
    },
  ],
})
export class GlobalModule {}
