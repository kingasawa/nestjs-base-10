import {
  Entity,
  Column, OneToMany,
} from 'typeorm';
import BaseEntity from './base.entity';
import AnswerEntity from './answer.entity';

@Entity({ name: 'questions' })
class QuestionEntity extends BaseEntity {
  @Column()
  type: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers: AnswerEntity[];
}

export default QuestionEntity;
