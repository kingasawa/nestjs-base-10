import { Column, Entity } from 'typeorm';
import BaseEntity from './base.entity';

@Entity({ name: 'tickets' })
class TicketEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  question: string;
}

export default TicketEntity;
