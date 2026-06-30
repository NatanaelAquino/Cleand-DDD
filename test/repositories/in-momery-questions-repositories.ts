
import { DomainEvents } from "../../src/core/events/domain-events";
import { PaginationParams } from "../../src/core/repositories/pagination-params";
import { QuestionAttachmentsRepository } from "../../src/domain/forum/application/repositories/question-attachments-repository";
import { QuestionsRepository } from "../../src/domain/forum/application/repositories/questions-repository";
import { Question } from "../../src/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async create(question: Question) {
    this.items.push(question);
    DomainEvents.dispatchEventsForAggregate(question.id);
  }
  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find(
      (question) => question.slug.value === slug,
    );
    return question || null;
  }
  async findById(id: string): Promise<Question | null> {
    const question = this.items.find(
      (question) => question.id.toString() === id,
    );
    return question || null;
  }
  async delete(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id,
    );
    this.items.splice(questionIndex, 1);

    await this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString(),
    );
  }
  async save(question: Question): Promise<void> {
    const itemsIndex = this.items.findIndex((item) => item.id === question.id);

    this.items[itemsIndex] = question;
    DomainEvents.dispatchEventsForAggregate(question.id);
  }
  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return questions;
  }
}
