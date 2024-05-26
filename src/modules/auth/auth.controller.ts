import {
  Controller,
  Get,
  Response,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '@core/guards/local-auth.guard';
// import { LoginFailedExceptionFilter } from '@core/filters/login-failed-exception.filter';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  // @UseFilters(LoginFailedExceptionFilter)
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
}
