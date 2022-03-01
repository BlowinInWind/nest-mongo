// import { createClient } from 'redis';
// import Redis from 'ioredis';
// import * as createRedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';
// import MongoStore from 'connect-mongo';
// const MongoStore = require('connect-mongo');
const MongoDBStore = require('connect-mongodb-session')(session);

export const setupSession = async (app) => {
  // const RedisStore = createRedisStore(session);
  const configService = app.get(ConfigService);

  // const redisClient = new Redis({
  //   host: configService.get('REDIS_HOST'),
  //   port: configService.get('REDIS_PORT'),
  // });

  // const redisClient = createClient({
  //   url: configService.get('redis'),
  //   legacyMode: true,
  // });
  // await redisClient.connect();

  // redisClient.on('error', console.error);

  const username = configService.get('DB_USER');
  const password = configService.get('DB_PASSWD');
  const host = configService.get('DB_HOST');
  const port = configService.get('DB_PORT');
  const dbDatabase = configService.get('DB_DATABASE');

  app.use(
    session({
      secret: configService.get('ICSUNI_COOKIE_SECRET'),
      store: new MongoDBStore({
        uri: `mongodb://${username}:${password}@${host}:${port}`,
        databaseName: dbDatabase,
        collection: 'sessions',
      }),
      name: configService.get('ICSUNI_COOKIE_NAME'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: process.env.ICSUNI_COOKIE_HTTP_ONLY == 'false' ? false : true,
        maxAge: 36000000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
