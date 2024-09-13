import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from 'typeorm';
import BaseEntity from './base.entity';
import UserEntity from './user.entity';

@Entity({ name: 'tests' })
class TestEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.tests)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'jsonb', nullable: false })
  questions: object
}

export default TestEntity;
