import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    console.log('Step 4: serializeUser', user);
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    console.log('id', id);
    done({}, id);
  });

  await app.listen(3000);
}
bootstrap();
