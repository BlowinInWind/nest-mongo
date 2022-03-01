// import { createClient } from 'redis';
// import Redis from 'ioredis';
// import * as createRedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';
import connectMongo from 'connect-mongo';

export const setupSession = async (app) => {
  // const RedisStore = createRedisStore(session);
  const configService = app.get(ConfigService);
  const MongoSessionStore = connectMongo;
  session;

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

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: configService.get('ICSUNI_COOKIE_SECRET'),
      name: configService.get('ICSUNI_COOKIE_NAME'),
      resave: false,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        httpOnly: process.env.ICSUNI_COOKIE_HTTP_ONLY == 'false' ? false : true,
        maxAge: configService.get('ICSUNI_COOKIE_MAX_AGE'),
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
