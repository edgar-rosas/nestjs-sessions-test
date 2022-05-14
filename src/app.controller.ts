import {
  Controller,
  Get,
  Post,
  Session as GetSession,
  UnauthorizedException,
} from '@nestjs/common';
import { Session } from 'express-session';

type UserSession = Session & Record<'user', any>;
@Controller('app')
export class AppController {
  @Get('me')
  getMe(@GetSession() session: UserSession) {
    if (!session.user) throw new UnauthorizedException('Not authenticated');
    return session.user;
  }

  @Post('auth')
  auth(@GetSession() session: UserSession) {
    session.user = {
      id: 1,
      email: 'me@edgarrosas.dev',
    };
    return 'auth successful';
  }

  @Post('logout')
  logout(@GetSession() session: UserSession) {
    return new Promise((resolve, reject) => {
      session.destroy((err) => {
        if (err) reject(err);
        resolve(undefined);
      });
    });
  }
}
