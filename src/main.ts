import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import IoRedis from 'ioredis';
import { AppModule } from './app.module';

const RedisStore = connectRedis(session);
const redisClient = new IoRedis('redis://localhost:6379');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: 'test-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 15,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
