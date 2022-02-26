import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GlobalService } from './global.service';
import { GlobalController } from './global.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('DB_USER');
        const password = configService.get('DB_PASSWD');
        const dbDatabase = configService.get('DB_DATABASE');
        const host = configService.get('DB_HOST');
        // icsOms0Dash:3bd3dc9cc8c56@10.221.100.137:19908/icsOmsDash
        mongodb: return {
          uri: `mongodb://${username}:${password}@${host}`,
          dbName: dbDatabase,
        };
      },
    }),
  ],
  controllers: [GlobalController],
  providers: [GlobalService],
})
export class GlobalModule {}
