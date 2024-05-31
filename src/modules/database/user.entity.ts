import {
  BeforeInsert,
  BeforeUpdate,
  Entity,
  Column,
} from 'typeorm';
import { encrypt } from '@shared/common/helper'
import BaseEntity from './base.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    this.password && (this.password = encrypt(this.password));
  }
}