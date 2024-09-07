import {
  Controller,
  Get,
  Response,
  Post,
  Request,
  UseGuards,
  UseFilters,
} from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginFailedExceptionFilter } from '@core/filters/login-failed-exception.filter';
import { LocalAuthGuard } from '@core/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @UseFilters(LoginFailedExceptionFilter)
  @Post('/login')
  async login(@Request() req, @Response() res) {
    try {
      console.log('Step 4: UserController req.user', req.user);
      const loginData = await this.authService.login(req.user);
      console.log('Step 6 get Login data', loginData);
      return res.status(200).send(loginData)
    } catch (error) {
      return res.send(error)
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('test')
  test(@Request() req, @Response() res) {
    console.log('test app');
    return res.status(200).send("test app");
  }
}
