import {
  Controller,
  Response,
  Post,
  Request
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @Post('/talk')
  async talkToBot(@Request() req, @Response() res): Promise<any> {
    const message = await this.userService.talkToBot(req.body);
    return res.json({ message });
  }
}
