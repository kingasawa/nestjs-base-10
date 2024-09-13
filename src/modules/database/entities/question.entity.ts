import {
  Entity,
  Column, OneToMany,
} from 'typeorm';
import BaseEntity from './base.entity';
import AnswerEntity from './answer.entity';

export enum QuestionType {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

@Entity({ name: 'questions' })
class QuestionEntity extends BaseEntity {
  @Column({ type: 'enum', enum: QuestionType, default: QuestionType.EASY })
  type: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers: AnswerEntity[];
}

export default QuestionEntity;
