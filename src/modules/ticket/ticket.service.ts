import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import TicketEntity from '@modules/database/entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketEntity)
    private ticketRepository: Repository<TicketEntity>,
  ) {}

  public async send(payload: TicketEntity): Promise<any> {
    const TicketEntity: TicketEntity = this.ticketRepository.create(payload);
    await this.ticketRepository.save(TicketEntity)
    return {
      error: false,
      user: TicketEntity,
      message: 'Success',
    };
  }
}
