import {
  Controller,
  Response,
  Post,
  Request,
} from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  async login(@Request() req, @Response() res) {
    try {
      console.log('req.body', req.body);
      const registered = await this.userService.register(req.body);
      return res.status(200).send(registered)
    } catch (error) {
      return res.send(error)
    }
  }
}
