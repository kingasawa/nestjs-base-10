import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from '@modules/ticket/ticket.controller';
import { TicketService } from '@modules/ticket/ticket.service';
import TicketEntity from '@modules/database/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketEntity])],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TypeOrmModule, TicketService],
})
export class TicketModule {}
