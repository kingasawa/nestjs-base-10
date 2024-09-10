import {
  Entity,
  Column,
} from 'typeorm';
import BaseEntity from './base.entity';

@Entity({ name: 'users' })
class UserEntity extends BaseEntity {
  @Column({ nullable: true })
  fullName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  birthday: string;

  @Column({ default: 6000 })
  secondToUse: number;

  @Column({ nullable: true })
  pushToken: string;

  @Column({ default: true })
  notification: boolean;

  @Column({ default: false })
  memberShip: boolean;

  @Column({ default: true })
  isActive: boolean;
}

export default UserEntity;
