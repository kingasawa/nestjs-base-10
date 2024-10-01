import {
  Controller,
  Response,
  Post,
  Request,
} from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(
    private ticketService: TicketService,
  ) {}

  @Post('/send')
  async send(@Request() req, @Response() res): Promise<any> {
    const ticket = await this.ticketService.send(req.body);
    return res.json({ ticket });
  }
}
