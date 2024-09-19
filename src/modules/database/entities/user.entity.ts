import {
  Entity,
  Column, OneToMany,
} from 'typeorm';
import BaseEntity from './base.entity';
import TestEntity from '@modules/database/entities/test.entity';

export enum UserGender {
  MALE = "Male",
  FEMALE = "Female",
  UNKNOWN = "Unknown",
  BOY = "Nam",
  GIRL = "Nữ",
}

@Entity({ name: 'users' })
class UserEntity extends BaseEntity {
  @Column({ nullable: true })
  fullName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserGender, default: UserGender.MALE })
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

  @OneToMany(() => TestEntity, (test) => test.user)
  tests: TestEntity[];
}

export default UserEntity;
