// import { createClient } from 'redis';
import Redis from 'ioredis';
import * as createRedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';

export const setupSession = async (app) => {
  const RedisStore = createRedisStore(session);
  const configService = app.get(ConfigService);

  const redisClient = new Redis({
    host: configService.get('REDIS_HOST'),
    port: configService.get('REDIS_PORT'),
  });

  // const redisClient = createClient({
  //   url: configService.get('redis'),
  //   legacyMode: true,
  // });
  // await redisClient.connect();

  redisClient.on('error', console.error);

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: configService.get('ICSUNI_COOKIE_SECRET'),
      name: 'token',
      resave: false,
      rolling: true,
      saveUninitialized: true,
      cookie: { maxAge: 3600000 },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
