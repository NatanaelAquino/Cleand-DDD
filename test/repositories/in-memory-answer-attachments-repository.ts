
import { AnswerAttachmentsRepository } from '../../src/domain/forum/application/repositories/answers-attachments-repository';
import { AnswerAttachment } from '../../src/domain/forum/enterprise/entities/answer-attachment';


export class InMemoryAnswerAttachmentsRepository implements AnswerAttachmentsRepository {
  public items: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() === answerId
    )

    return answerAttachments
  }
  async deleteManyByAnswerId(answerId: string){
    this.items = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    )
  }
}