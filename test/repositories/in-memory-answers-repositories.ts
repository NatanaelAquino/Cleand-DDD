import { Answer } from '../../src/domain/forum/enterprise/entities/answer';
import { AnswersRepository } from '../../src/domain/forum/application/repositories/answers-repository';
import { AnswerAttachmentsRepository } from '../../src/domain/forum/application/repositories/answers-attachments-repository';
import { DomainEvents } from '../../src/core/events/domain-events';
import { PaginationParams } from '../../src/core/repositories/pagination-params';


export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];
  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async create(answer: Answer) {
    this.items.push(answer);

    DomainEvents.dispatchEventsForAggregate(answer.id);
  }
  async findById(id: string): Promise<Answer | null> {
    const Answer = this.items.find((Answer) => Answer.id.toString() === id);
    return Answer || null;
  }
  async delete(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex(
      (Answer) => Answer.id === Answer.id,
    );
    this.items.splice(answerIndex, 1);
    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString());
  }
  async save(Answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex(
      (Answer) => Answer.id === Answer.id,
    );
    this.items[answerIndex] = Answer;

    DomainEvents.dispatchEventsForAggregate(Answer.id);
  }
  async findMyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((item) => item.questionId.toString() == questionId)
      .splice((page - 1) * 20, page * 20);

    return answers;
  }
}
