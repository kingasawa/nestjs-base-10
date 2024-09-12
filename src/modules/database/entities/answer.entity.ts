import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from './base.entity';
import QuestionEntity from './question.entity';

@Entity({ name: 'answers' })
class AnswerEntity extends BaseEntity {
  @Column({ nullable: false })
  content: string;

  @Column()
  isCorrect: boolean;

  @ManyToOne(() => QuestionEntity, (question) => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: QuestionEntity;
}

export default AnswerEntity;
